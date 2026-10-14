import React, { useState } from "react";
import {
  User,
  GraduationCap,
  Target,
  Clock,
  Phone,
  Mail,
  Save,
  CheckCircle2,
  Calendar,
  Ticket,
  ShieldCheck
} from "lucide-react";
import { Badge } from "../components/common/Badge";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { useToast } from "../common/Toast";

export const ProfilePage = ({ navigate }) => {
  const { currentUser, updateUserProfile, isAdmin } = useAuth();
  const { registrations, seminars } = useData();
  const { success } = useToast();

  const [displayName, setDisplayName] = useState(currentUser?.displayName || "");
  const [educationLevel, setEducationLevel] = useState(currentUser?.educationLevel || "Undergraduate (Final Year)");
  const [college, setCollege] = useState(currentUser?.college || "University Campus");
  const [phone, setPhone] = useState(currentUser?.phone || "+91 98765 43210");
  const [dailyGoalHours, setDailyGoalHours] = useState(currentUser?.dailyGoalHours || 4);
  const [targetExams, setTargetExams] = useState(currentUser?.targetExams || ["UPSC Civil Services", "SSC CGL"]);
  const [saving, setSaving] = useState(false);

  const availableExams = [
    "UPSC Civil Services",
    "SSC CGL / CHSL",
    "Banking (IBPS & SBI PO)",
    "Railways RRB NTPC",
    "GATE & PSUs",
    "Defence (CDS / NDA / AFCAT)",
    "State PSC (MPSC)",
    "NEET / JEE"
  ];

  const handleToggleTargetExam = (examName) => {
    if (targetExams.includes(examName)) {
      setTargetExams(targetExams.filter((e) => e !== examName));
    } else {
      setTargetExams([...targetExams, examName]);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    await updateUserProfile({
      displayName,
      educationLevel,
      college,
      phone,
      dailyGoalHours: Number(dailyGoalHours),
      targetExams,
    });
    setSaving(false);
    success("Profile and preparation goals updated successfully!");
  };

  // Student's registered seminars
  const myRegisteredSeminars = seminars.filter((s) =>
    registrations.some((r) => r.seminarId === s.id)
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div>
        <Badge variant="primary" size="md">Aspirant Profile</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
          Profile & Preparation Goals
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Configure your target examinations, daily study target, and review your seminar registrations.
        </p>
      </div>

      {/* Main Profile Form Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
        <form onSubmit={handleSave} className="space-y-6">
          
          {/* Avatar and Basic Details */}
          <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
            <img
              src={currentUser?.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"}
              alt={currentUser?.displayName}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-200 shadow-sm"
            />
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900">{displayName || "Aspirant Name"}</h3>
              <p className="text-xs text-slate-500">{currentUser?.email}</p>
              <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                {currentUser?.role || "Student"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                disabled
                value={currentUser?.email || ""}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 text-sm cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Education Level
              </label>
              <select
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm bg-white"
              >
                <option value="12th Standard / Junior College">12th Standard / Junior College</option>
                <option value="Undergraduate (1st / 2nd Year)">Undergraduate (1st / 2nd Year)</option>
                <option value="Undergraduate (Final Year)">Undergraduate (Final Year)</option>
                <option value="Completed Graduation">Completed Graduation</option>
                <option value="Postgraduate / Master's">Postgraduate / Master's</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                College / Institution
              </label>
              <input
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                placeholder="e.g. Pune University"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Daily Study Target
              </label>
              <select
                value={dailyGoalHours}
                onChange={(e) => setDailyGoalHours(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm bg-white"
              >
                <option value={2}>2 Hours / Day</option>
                <option value={3}>3 Hours / Day</option>
                <option value={4}>4 Hours / Day (Standard)</option>
                <option value={6}>6 Hours / Day</option>
                <option value={8}>8 Hours / Day (Full-Time)</option>
              </select>
            </div>
          </div>

          {/* TARGET EXAMS SELECTION */}
          <div className="border-t border-slate-100 pt-5 space-y-3">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Primary Target Examinations
            </label>
            <p className="text-xs text-slate-500">
              Select all competitive examinations you are currently preparing for or planning to appear in:
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {availableExams.map((exam) => {
                const isSelected = targetExams.includes(exam);
                return (
                  <button
                    key={exam}
                    type="button"
                    onClick={() => handleToggleTargetExam(exam)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                      isSelected
                        ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {isSelected && "✓ "}
                    {exam}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center gap-2 transition disabled:opacity-70"
            >
              <Save className="w-4 h-4" />
              {saving ? "Saving Changes..." : "Save Profile & Goals"}
            </button>
          </div>
        </form>
      </div>

      {/* MY REGISTERED SEMINARS HISTORY */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Registered Guidance Sessions</h3>
            <p className="text-xs text-slate-500">Your seminar admission passes and session confirmations</p>
          </div>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            {myRegisteredSeminars.length} Session{myRegisteredSeminars.length === 1 ? "" : "s"}
          </span>
        </div>

        <div className="space-y-3 pt-2">
          {myRegisteredSeminars.map((sem) => (
            <div
              key={sem.id}
              onClick={() => navigate(`/seminars/${sem.id}`)}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:shadow-sm cursor-pointer transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant={sem.mode === "Online" ? "primary" : "purple"} size="sm">
                    {sem.mode}
                  </Badge>
                  <span className="text-xs font-bold text-slate-800">{sem.title}</span>
                </div>
                <p className="text-xs text-slate-500">
                  {sem.date} • {sem.time} • Speaker: {sem.speaker?.name}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Pass Confirmed
                </span>
              </div>
            </div>
          ))}

          {myRegisteredSeminars.length === 0 && (
            <div className="text-center py-6 text-xs text-slate-400">
              No registered sessions yet. Explore our upcoming webinars to reserve your pass.
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
