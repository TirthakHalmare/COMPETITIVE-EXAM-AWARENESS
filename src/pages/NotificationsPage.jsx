import React, { useState } from "react";
import {
  Bell,
  CheckCircle2,
  Trash2,
  AlertCircle,
  Calendar,
  BookOpen,
  CheckSquare,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Volume2
} from "lucide-react";
import { Badge } from "../components/common/Badge";
import { useNotifications } from "../context/NotificationContext";
import { useToast } from "../common/Toast";

export const NotificationsPage = ({ navigate }) => {
  const {
    notifications,
    unreadCount,
    pushPermission,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    enablePush,
  } = useNotifications();

  const { success, error: toastError, info } = useToast();
  const [filterCategory, setFilterCategory] = useState("all");
  const [enablingPush, setEnablingPush] = useState(false);

  const filteredNotifications = notifications.filter((n) => {
    if (filterCategory === "all") return true;
    return n.category === filterCategory;
  });

  const handleEnablePush = async () => {
    setEnablingPush(true);
    const res = await enablePush();
    setEnablingPush(false);

    if (res.status === "granted") {
      success("Push notifications enabled! You will receive live seminar reminders.");
    } else if (res.status === "denied") {
      toastError("Notification permission was denied in your browser settings.");
    } else if (res.status === "unsupported") {
      info("Browser notifications are not supported on this browser.");
    }
  };

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case "seminar": return <Calendar className="w-4 h-4 text-blue-600" />;
      case "exam": return <BookOpen className="w-4 h-4 text-purple-600" />;
      case "task": return <CheckSquare className="w-4 h-4 text-emerald-600" />;
      default: return <Bell className="w-4 h-4 text-amber-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <Badge variant="primary" size="md">Notification Center</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
            Exam & Seminar Alerts
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Stay updated with seminar reminders, study schedule alerts, and verified commission calendar changes.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={() => {
              markAllAsRead();
              success("All notifications marked as read!");
            }}
            className="px-3.5 py-2 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-xl border border-blue-200 transition"
          >
            Mark All as Read ({unreadCount})
          </button>
        )}
      </div>

      {/* PUSH NOTIFICATION PERMISSION STATUS CARD */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
              pushPermission === "granted"
                ? "bg-emerald-50 text-emerald-600"
                : "bg-amber-50 text-amber-600"
            }`}>
              <Volume2 className="w-5 h-5" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-slate-900">Browser & FCM Push Notifications</h4>
                <Badge
                  variant={pushPermission === "granted" ? "success" : pushPermission === "denied" ? "danger" : "warning"}
                  size="sm"
                >
                  Status: {pushPermission}
                </Badge>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {pushPermission === "granted"
                  ? "Real-time desktop alerts are active. You will receive seminar start notices directly."
                  : pushPermission === "denied"
                  ? "Browser notifications were blocked. Enable them in site settings to receive instant alerts."
                  : "Enable push notifications to receive immediate seminar reminders before seats fill up."}
              </p>
            </div>
          </div>

          {pushPermission !== "granted" && pushPermission !== "unsupported" && (
            <button
              onClick={handleEnablePush}
              disabled={enablingPush}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition disabled:opacity-70 shrink-0"
            >
              {enablingPush ? "Requesting..." : "Enable Push Alerts"}
            </button>
          )}
        </div>
      </div>

      {/* CATEGORY TABS */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setFilterCategory("all")}
          className={`px-3 py-1.5 text-xs font-bold rounded-xl transition ${
            filterCategory === "all"
              ? "bg-slate-900 text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          All Alerts ({notifications.length})
        </button>
        <button
          onClick={() => setFilterCategory("seminar")}
          className={`px-3 py-1.5 text-xs font-bold rounded-xl transition ${
            filterCategory === "seminar"
              ? "bg-blue-600 text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Seminars & Sessions
        </button>
        <button
          onClick={() => setFilterCategory("exam")}
          className={`px-3 py-1.5 text-xs font-bold rounded-xl transition ${
            filterCategory === "exam"
              ? "bg-purple-600 text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Exam Deadlines
        </button>
        <button
          onClick={() => setFilterCategory("task")}
          className={`px-3 py-1.5 text-xs font-bold rounded-xl transition ${
            filterCategory === "task"
              ? "bg-emerald-600 text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Study Reminders
        </button>
      </div>

      {/* NOTIFICATION FEED */}
      <div className="space-y-3">
        {filteredNotifications.map((notif) => (
          <div
            key={notif.id}
            onClick={() => {
              if (!notif.read) markAsRead(notif.id);
              if (notif.actionLink) navigate(notif.actionLink);
            }}
            className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
              notif.read
                ? "bg-white border-slate-200/90 text-slate-700"
                : "bg-blue-50/60 border-blue-200 text-slate-900 shadow-sm"
            }`}
          >
            <div className="flex items-start gap-3.5 min-w-0 flex-1">
              <div className="p-2 rounded-xl bg-white border border-slate-200/80 shrink-0 shadow-xs">
                {getCategoryIcon(notif.category)}
              </div>

              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold truncate leading-snug">{notif.title}</h4>
                  {!notif.read && (
                    <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {notif.message}
                </p>

                <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-400">
                  <span>{new Date(notif.timestamp).toLocaleString()}</span>
                  {notif.actionLink && (
                    <span className="text-blue-600 font-semibold hover:underline">
                      View Details →
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => deleteNotification(notif.id)}
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                title="Delete alert"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {filteredNotifications.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/90 shadow-sm space-y-2">
            <Bell className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No alerts in this category</h3>
            <p className="text-xs text-slate-500">You're completely caught up with all session announcements!</p>
          </div>
        )}
      </div>

    </div>
  );
};
