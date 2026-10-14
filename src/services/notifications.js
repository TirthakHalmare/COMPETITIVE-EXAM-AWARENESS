import { messaging, isFirebaseConfigured } from "./firebase";
import { getToken, onMessage } from "firebase/messaging";

/**
 * Checks if Notification API is supported in the current browser
 */
export const isNotificationSupported = () => {
  return typeof window !== "undefined" && "Notification" in window;
};

/**
 * Get current browser notification permission state
 * @returns {'default' | 'granted' | 'denied' | 'unsupported'}
 */
export const getNotificationPermission = () => {
  if (!isNotificationSupported()) return "unsupported";
  return Notification.permission;
};

/**
 * Request Notification Permission from User
 * Integrates FCM token registration if Firebase messaging is active
 */
export const requestNotificationPermission = async () => {
  if (!isNotificationSupported()) {
    return {
      success: false,
      status: "unsupported",
      message: "Browser notifications are not supported on this device/browser.",
    };
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      let fcmToken = null;

      // If Firebase Messaging is configured, attempt to get registration token
      if (isFirebaseConfigured && messaging) {
        try {
          const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY;
          fcmToken = await getToken(messaging, {
            vapidKey: vapidKey && vapidKey !== "your_fcm_vapid_key_optional" ? vapidKey : undefined,
          });
        } catch (fcmErr) {
          console.warn("FCM Token generation warning:", fcmErr.message);
        }
      }

      // Show welcome notification
      showLocalNotification(
        "Notifications Enabled! 🔔",
        "You will now receive alerts for upcoming seminars, registrations, and exam dates."
      );

      return {
        success: true,
        status: "granted",
        token: fcmToken,
        message: "Notification permissions granted successfully!",
      };
    } else {
      return {
        success: false,
        status: permission,
        message: "Notification permission was not granted.",
      };
    }
  } catch (err) {
    console.error("Error requesting notification permission:", err);
    return {
      success: false,
      status: "error",
      message: err.message || "Failed to request notification permission.",
    };
  }
};

/**
 * Display a local browser notification if permitted
 */
export const showLocalNotification = (title, body, options = {}) => {
  if (isNotificationSupported() && Notification.permission === "granted") {
    try {
      new Notification(title, {
        body,
        icon: "/favicon.ico",
        badge: "/favicon.ico",
        ...options,
      });
    } catch (e) {
      console.warn("Could not display notification:", e);
    }
  }
};

/**
 * Listen for foreground FCM messages if enabled
 */
export const onForegroundMessage = (callback) => {
  if (isFirebaseConfigured && messaging) {
    return onMessage(messaging, (payload) => {
      callback(payload);
    });
  }
  return () => {};
};
