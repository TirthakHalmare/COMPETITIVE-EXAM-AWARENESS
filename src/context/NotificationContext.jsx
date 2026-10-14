import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getNotificationPermission,
  requestNotificationPermission,
  showLocalNotification
} from "../services/notifications";

const NotificationContext = createContext(null);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};

const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    title: "Reminder: UPSC & State PSC Strategy Seminar",
    message: "The flagship seminar by Dr. Arvind Sharma is scheduled for Oct 25 at 10:30 AM IST. Make sure to review your registration pass.",
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
    read: false,
    category: "seminar",
    actionLink: "/seminars"
  },
  {
    id: "notif-2",
    title: "Tentative Calendar Alert: SSC CGL 2026",
    message: "SSC has issued preliminary notification dates. Notification window begins June 2026.",
    timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
    read: false,
    category: "exam",
    actionLink: "/exams/ssc-cgl"
  },
  {
    id: "notif-3",
    title: "Daily Study Target Check-in",
    message: "You have 3 pending study tasks scheduled for today. Complete them to maintain your preparation streak!",
    timestamp: new Date(Date.now() - 3600000 * 48).toISOString(),
    read: true,
    category: "task",
    actionLink: "/planner"
  }
];

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(() => {
    try {
      const stored = localStorage.getItem("cea_notifications");
      return stored ? JSON.parse(stored) : INITIAL_NOTIFICATIONS;
    } catch (e) {
      return INITIAL_NOTIFICATIONS;
    }
  });

  const [pushPermission, setPushPermission] = useState(() => getNotificationPermission());

  useEffect(() => {
    try {
      localStorage.setItem("cea_notifications", JSON.stringify(notifications));
    } catch (e) {
      console.error("Error saving notifications:", e);
    }
  }, [notifications]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const addNotification = (notif) => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      timestamp: new Date().toISOString(),
      read: false,
      ...notif
    };
    setNotifications(prev => [newNotif, ...prev]);

    // Show system notification if granted
    if (pushPermission === "granted") {
      showLocalNotification(newNotif.title, newNotif.message);
    }
    return newNotif;
  };

  const enablePush = async () => {
    const res = await requestNotificationPermission();
    setPushPermission(res.status);
    return res;
  };

  const value = {
    notifications,
    unreadCount,
    pushPermission,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    addNotification,
    enablePush
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
