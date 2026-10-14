import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, isSupported } from "firebase/messaging";

// Firebase configuration from Vite environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Check if actual configuration has been provided
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.apiKey !== "your_api_key_here" &&
  firebaseConfig.projectId &&
  firebaseConfig.projectId !== "your_project_id"
);

let app = null;
let auth = null;
let db = null;
let messaging = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);

    // Initialize Messaging safely (requires browser support and HTTPS/localhost)
    if (typeof window !== "undefined") {
      isSupported().then((supported) => {
        if (supported) {
          try {
            messaging = getMessaging(app);
          } catch (e) {
            console.warn("FCM messaging initialization skipped:", e.message);
          }
        }
      }).catch((e) => {
        console.warn("FCM isSupported check error:", e.message);
      });
    }
  } catch (error) {
    console.warn("Firebase initialization error (falling back to local mock mode):", error.message);
  }
} else {
  console.info(
    "💡 Running in Demo / Standalone Mode. To connect to Cloud Firestore & Auth, provide your Firebase keys in .env"
  );
}

export { app, auth, db, messaging };
