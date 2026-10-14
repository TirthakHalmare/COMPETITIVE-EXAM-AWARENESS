import React, { useState } from "react";
import {
  ShieldCheck,
  Plus,
  Edit3,
  Trash2,
  Calendar,
  BookOpen,
  Users,
  Bell,
  Sparkles,
  Database,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Search
} from "lucide-react";
import { Badge } from "../components/common/Badge";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { useToast } from "../common/Toast";
import { AdminExamModal } from "../components/admin/AdminExamModal";
import { AdminSeminarModal } from "../components/admin/AdminSeminarModal";
import { AdminAnnouncementModal } from "../components/admin/AdminAnnouncementModal";

export const AdminDashboardPage = ({ navigate }) => {
  const { currentUser, isAdmin, switchDemoRole, isFirebase } = useAuth();
  const {
    exams,
    seminars,
    registrations,
    announcements,
    saveExam,
    deleteExam,
    saveSeminar,
    deleteSeminar,
    addAnnouncement,
    seedDatabase,
  } = useData();

  const { success, error: toastError, info } = useToast();

  const [activeTab, setActiveTab] = useState("seminars"); // seminars, exams, registrations, announcements
  const [examModalOpen, setExamModalOpen] = useState(false);
  const [examToEdit, setExamToEdit] = useState(null);

  const [seminarModalOpen, setSeminarModalOpen] = useState(false);
  const [seminarToEdit, setSeminarToEdit] = useState(null);

  const [announcementModalOpen, setAnnouncementModalOpen] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [regSearchQuery, setRegSearchQuery] = useState("");

  // Non-admin safeguard
  if (!isAdmin) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
          <ShieldCheck className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900">Administrator Access Required</h2>
        <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
          The management area is protected by Firebase Security Rules and role verification. Only authorized administrators can publish seminars, modify exams, or access student registration lists.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => switchDemoRole("admin")}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition"
          >
            Switch to Admin Demo Mode
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
          >
            Back to Student Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Handle Seeding
  const handleSeed = async () => {
    if (!window.confirm("Seed sample dataset into database? This refreshes all initial exams, seminars and announcements.")) return;
    setSeeding(true);
    try {
      const res = await seedDatabase();
      success(res.message);
    } catch (e) {
      toastError("Failed to seed database: " + e.message);
    } finally {
      setSeeding(false);
    }
  };

  // Filtered registrations
  const filteredRegistrations = registrations.filter((r) => {
    const q = regSearchQuery.toLowerCase();
    if (!q) return true;
    return (
      r.studentName?.toLowerCase().includes(q) ||
      r.studentEmail?.toLowerCase().includes(q) ||
      r.seminarId?.toLowerCase().includes(q) ||
      r.targetExam?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-400/20 border border-purple-300/30 text-purple-200 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Administration
            </span>
            <span className="text-xs text-purple-200 font-mono">
              Role: {currentUser?.role}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Program Control & Seminar Management
          </h1>
          <p className="text-xs sm:text-sm text-purple-100/80">
            Publish upcoming seminars, manage competitive exam syllabi, view student attendees, and broadcast notices.
          </p>
        </div>

        {/* Database Seed Trigger */}
        <button
          onClick={handleSeed}
          disabled={seeding}
          className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 shadow-sm flex items-center gap-2 transition disabled:opacity-50 shrink-0"
          title="Populate Cloud Firestore or local state with initial realistic dataset"
        >
          <Database className="w-4 h-4 text-purple-300" />
          {seeding ? "Populating..." : "Seed / Reset Sample Data"}
        </button>
      </div>

      {/* STATS OVERVIEW CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Seminars</span>
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{seminars.length}</span>
          <p className="text-[11px] text-slate-400 mt-1">Online & offline sessions</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Exams Catalog</span>
            <BookOpen className="w-5 h-5 text-indigo-600" />
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{exams.length}</span>
          <p className="text-[11px] text-slate-400 mt-1">Syllabi & eligibility criteria</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Bookings</span>
            <Users className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{registrations.length}</span>
          <p className="text-[11px] text-slate-400 mt-1">Confirmed student attendees</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Announcements</span>
            <Bell className="w-5 h-5 text-purple-600" />
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{announcements.length}</span>
          <p className="text-[11px] text-slate-400 mt-1">Published notices</p>
        </div>
      </div>

      {/* ADMIN WORKSPACE TABS */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-1 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab("seminars")}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition shrink-0 ${
              activeTab === "seminars"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Manage Seminars ({seminars.length})
          </button>
          <button
            onClick={() => setActiveTab("exams")}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition shrink-0 ${
              activeTab === "exams"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Manage Exams ({exams.length})
          </button>
          <button
            onClick={() => setActiveTab("registrations")}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition shrink-0 ${
              activeTab === "registrations"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Attendee Registrations ({registrations.length})
          </button>
          <button
            onClick={() => setActiveTab("announcements")}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition shrink-0 ${
              activeTab === "announcements"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Broadcast Notices ({announcements.length})
          </button>
        </div>

        {/* TAB 1: MANAGE SEMINARS */}
        {activeTab === "seminars" && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Seminars & Guidance Sessions</h3>
                <p className="text-xs text-slate-500">Create new offline seminars or webinars and update schedules</p>
              </div>
              <button
                onClick={() => {
                  setSeminarToEdit(null);
                  setSeminarModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition"
              >
                <Plus className="w-4 h-4" /> Add Seminar / Session
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px] tracking-wider border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-4">Title & Topic</th>
                    <th className="py-3 px-4">Speaker</th>
                    <th className="py-3 px-4">Schedule</th>
                    <th className="py-3 px-4">Mode</th>
                    <th className="py-3 px-4">Seats Booked</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {seminars.map((sem) => (
                    <tr key={sem.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-4">
                        <span className="font-bold text-slate-900 block truncate max-w-xs">{sem.title}</span>
                        <span className="text-[11px] text-purple-700 truncate block max-w-xs">{sem.topic}</span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-800">{sem.speaker?.name}</td>
                      <td className="py-3 px-4">
                        <span>{sem.date}</span>
                        <span className="block text-[11px] text-slate-400">{sem.time}</span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={sem.mode === "Online" ? "primary" : "purple"} size="sm">
                          {sem.mode}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 font-semibold">
                        {sem.registeredCount || 0} / {sem.totalSeats || 100}
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setSeminarToEdit(sem);
                            setSeminarModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-purple-600 hover:bg-purple-50 transition"
                          title="Edit seminar"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete seminar "${sem.title}"?`)) {
                              deleteSeminar(sem.id);
                              success("Seminar deleted.");
                            }
                          }}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition"
                          title="Delete seminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: MANAGE EXAMS */}
        {activeTab === "exams" && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Competitive Exam Directory</h3>
                <p className="text-xs text-slate-500">Publish exam notifications, eligibility and syllabus breakdowns</p>
              </div>
              <button
                onClick={() => {
                  setExamToEdit(null);
                  setExamModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition"
              >
                <Plus className="w-4 h-4" /> Add New Exam
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px] tracking-wider border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-4">Exam Name</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Conducting Body</th>
                    <th className="py-3 px-4">Prelims Schedule</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {exams.map((exam) => (
                    <tr key={exam.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-4 font-bold text-slate-900">{exam.name}</td>
                      <td className="py-3 px-4">{exam.category}</td>
                      <td className="py-3 px-4 font-semibold text-slate-800">{exam.conductingBody}</td>
                      <td className="py-3 px-4">{exam.importantDates?.prelimsDate}</td>
                      <td className="py-3 px-4">
                        {exam.importantDates?.isTentative ? (
                          <Badge variant="warning" size="sm">Tentative</Badge>
                        ) : (
                          <Badge variant="success" size="sm">Verified</Badge>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setExamToEdit(exam);
                            setExamModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-purple-600 hover:bg-purple-50 transition"
                          title="Edit exam"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete exam "${exam.name}"?`)) {
                              deleteExam(exam.id);
                              success("Exam deleted.");
                            }
                          }}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition"
                          title="Delete exam"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: REGISTRATIONS / ATTENDEES */}
        {activeTab === "registrations" && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Student Session Registrations</h3>
                <p className="text-xs text-slate-500">Attendee list and registered contact details</p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={regSearchQuery}
                  onChange={(e) => setRegSearchQuery(e.target.value)}
                  placeholder="Filter attendees..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px] tracking-wider border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-4">Pass ID</th>
                    <th className="py-3 px-4">Student Name</th>
                    <th className="py-3 px-4">Email & Phone</th>
                    <th className="py-3 px-4">Session ID / Title</th>
                    <th className="py-3 px-4">Target Exam</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredRegistrations.map((reg) => (
                    <tr key={reg.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-4 font-mono font-bold text-purple-700">{reg.id}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">{reg.studentName}</td>
                      <td className="py-3 px-4">
                        <span>{reg.studentEmail}</span>
                        {reg.studentPhone && <span className="block text-slate-400 text-[11px]">{reg.studentPhone}</span>}
                      </td>
                      <td className="py-3 px-4 max-w-xs truncate">{reg.seminarId}</td>
                      <td className="py-3 px-4 font-semibold">{reg.targetExam || "Civil Services"}</td>
                      <td className="py-3 px-4">
                        <Badge variant="success" size="sm">{reg.status || "Confirmed"}</Badge>
                      </td>
                    </tr>
                  ))}
                  {filteredRegistrations.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-slate-400">
                        No registrations found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: ANNOUNCEMENTS */}
        {activeTab === "announcements" && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Broadcast Announcements</h3>
                <p className="text-xs text-slate-500">Post system notifications and banner updates for students</p>
              </div>
              <button
                onClick={() => setAnnouncementModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition"
              >
                <Plus className="w-4 h-4" /> New Announcement
              </button>
            </div>

            <div className="space-y-3">
              {announcements.map((ann) => (
                <div
                  key={ann.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="purple" size="sm">{ann.badge || "Notice"}</Badge>
                      <h4 className="font-bold text-slate-900 text-sm">{ann.title}</h4>
                      <span className="text-[11px] text-slate-400">• {ann.date}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{ann.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* MODALS */}
      <AdminExamModal
        isOpen={examModalOpen}
        onClose={() => setExamModalOpen(false)}
        onSave={(data) => {
          saveExam(data);
          success("Exam saved successfully!");
        }}
        examToEdit={examToEdit}
      />

      <AdminSeminarModal
        isOpen={seminarModalOpen}
        onClose={() => setSeminarModalOpen(false)}
        onSave={(data) => {
          saveSeminar(data);
          success("Guidance session saved successfully!");
        }}
        seminarToEdit={seminarToEdit}
      />

      <AdminAnnouncementModal
        isOpen={announcementModalOpen}
        onClose={() => setAnnouncementModalOpen(false)}
        onPost={(data) => {
          addAnnouncement(data);
          success("Announcement broadcast to all students!");
        }}
      />

    </div>
  );
};
