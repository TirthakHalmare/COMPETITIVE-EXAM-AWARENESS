import React, { useState } from "react";
import {
  GraduationCap,
  Calendar,
  CheckSquare,
  Bookmark,
  Bell,
  Sparkles,
  ArrowRight,
  Clock,
  Video,
  MapPin,
  ExternalLink,
  Plus,
  Flame,
  Award,
  BookOpen
} from "lucide-react";
import { Badge } from "../components/common/Badge";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { TaskItem } from "../components/planner/TaskItem";
import { TaskFormModal } from "../components/planner/TaskFormModal";

export const DashboardPage = ({ navigate }) => {
  const { currentUser } = useAuth();
  const {
    exams,
    seminars,
    registrations,
    saved,
    studyTasks,
    toggleTaskComplete,
    deleteTask,
    saveTask,
  } = useData();

  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Compute stats
  const registeredCount = registrations.length;
  const savedExamsCount = saved.exams?.length || 0;
  const totalTasks = studyTasks.length;
  const completedTasks = studyTasks.filter((t) => t.completed).length;
  const taskProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Find next registered seminar
  const registeredSeminarIds = registrations.map((r) => r.seminarId);
  const myUpcomingSeminars = seminars.filter(
    (s) => registeredSeminarIds.includes(s.id) && s.status === "upcoming"
  );
  const nextMySeminar = myUpcomingSeminars[0];

  // Target exams
  const targetExamNames = currentUser?.targetExams || ["UPSC Civil Services", "SSC CGL"];
  const myTargetExams = exams.filter((e) =>
    targetExamNames.some(
      (name) => e.name.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(e.name.toLowerCase())
    )
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* WELCOME BANNER */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={currentUser?.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"}
              alt={currentUser?.displayName}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-white/40 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-200 bg-white/10 px-2.5 py-0.5 rounded-full">
                  {currentUser?.role === "admin" ? "Platform Administrator" : "Aspirant Dashboard"}
                </span>
                <span className="text-xs text-blue-200">
                  {currentUser?.educationLevel || "Degree Student"}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Welcome back, {currentUser?.displayName || "Student"}! 👋
              </h1>
              <p className="text-xs sm:text-sm text-blue-100/90 mt-1">
                Target Exams: <span className="font-bold text-white">{targetExamNames.join(", ")}</span> • Goal: {currentUser?.dailyGoalHours || 4}h daily study
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/profile")}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition"
            >
              Edit Goals & Profile
            </button>
            <button
              onClick={() => navigate("/planner")}
              className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-xs font-bold shadow-md transition"
            >
              Open Study Planner
            </button>
          </div>
        </div>
      </div>

      {/* QUICK STATS METRICS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          onClick={() => navigate("/saved")}
          className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:border-blue-300 cursor-pointer transition"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Saved Exams</span>
            <Bookmark className="w-5 h-5 text-blue-600" />
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{savedExamsCount}</span>
          <p className="text-[11px] text-slate-400 mt-1">Bookmarked for quick tracking</p>
        </div>

        <div
          onClick={() => navigate("/saved")}
          className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:border-blue-300 cursor-pointer transition"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Registered Sessions</span>
            <Calendar className="w-5 h-5 text-indigo-600" />
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{registeredCount}</span>
          <p className="text-[11px] text-slate-400 mt-1">Confirmed seminar passes</p>
        </div>

        <div
          onClick={() => navigate("/planner")}
          className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:border-blue-300 cursor-pointer transition"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Today's Tasks</span>
            <CheckSquare className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {completedTasks} / {totalTasks}
          </span>
          <p className="text-[11px] text-slate-400 mt-1">{taskProgress}% completed today</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Study Streak</span>
            <Flame className="w-5 h-5 text-amber-500" />
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-amber-600">5 Days</span>
          <p className="text-[11px] text-slate-400 mt-1">Keep the momentum going!</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT 2 COLUMNS: Next Seminar + Target Exams + Strategies */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* NEXT REGISTERED SEMINAR NOTICE */}
          {nextMySeminar ? (
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-blue-200 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-between gap-2 mb-3">
                <Badge variant="primary" size="sm" icon={Sparkles}>
                  Your Next Guidance Seminar
                </Badge>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                  Confirmed Pass
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-1">
                {nextMySeminar.title}
              </h3>
              <p className="text-xs text-blue-800 font-semibold mb-3">
                Speaker: {nextMySeminar.speaker?.name} ({nextMySeminar.speaker?.designation})
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-700 bg-white/80 p-3 rounded-xl border border-blue-100 mb-4">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Calendar className="w-4 h-4 text-blue-600" /> {nextMySeminar.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-blue-600" /> {nextMySeminar.time}
                </span>
                <span className="flex items-center gap-1.5 font-semibold text-purple-700">
                  {nextMySeminar.mode === "Online" ? <Video className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                  {nextMySeminar.mode}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-xs text-slate-500">
                  {nextMySeminar.mode === "Online" ? "Meeting room URL active on event day" : `Venue: ${nextMySeminar.venue}`}
                </span>
                <button
                  onClick={() => navigate(`/seminars/${nextMySeminar.id}`)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-sm"
                >
                  View Details & Pass →
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                You haven't registered for any upcoming seminars yet
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Explore our upcoming offline seminars and interactive webinars with UPSC, SSC, and Banking mentors. Admission is free!
              </p>
              <button
                onClick={() => navigate("/seminars")}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition"
              >
                Browse & Register for Seminars
              </button>
            </div>
          )}

          {/* MY TARGET EXAMS SHORTCUT */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">My Target Examinations</h3>
                <p className="text-xs text-slate-500">Quick syllabus and timeline status</p>
              </div>
              <button
                onClick={() => navigate("/exams")}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                All Exams Directory <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(myTargetExams.length > 0 ? myTargetExams : exams.slice(0, 2)).map((exam) => (
                <div
                  key={exam.id}
                  onClick={() => navigate(`/exams/${exam.id}`)}
                  className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md cursor-pointer transition space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <Badge variant="primary" size="sm">{exam.category}</Badge>
                    <span className="text-[11px] font-semibold text-slate-400">{exam.difficultyLevel} Level</span>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600">{exam.name}</h4>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{exam.fullName}</p>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl text-xs text-slate-600 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Next Prelims:</span>
                      <span className="font-semibold text-slate-800">{exam.importantDates?.prelimsDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Avg Prep:</span>
                      <span className="font-semibold text-slate-800">{exam.averagePrepTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* QUICK PREPARATION TIPS CARD */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400">
                <Sparkles className="w-3.5 h-3.5" /> Strategy Tip of the Week
              </div>
              <h4 className="text-base font-bold text-white">
                The 1:2 Ratio for Mock Tests
              </h4>
              <p className="text-xs text-slate-300 max-w-lg leading-relaxed">
                For every 1 hour spent taking a mock test, dedicate 2 full hours to dissecting your mistakes, revising missed concepts, and maintaining your personalized error logbook.
              </p>
            </div>
            <button
              onClick={() => navigate("/strategies")}
              className="px-4 py-2.5 rounded-xl bg-white text-slate-900 text-xs font-bold hover:bg-slate-100 shrink-0 transition"
            >
              Explore All Strategies →
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: DAILY STUDY PLANNER WIDGET */}
        <div className="space-y-6">
          
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Today's Study Plan</h3>
                <p className="text-xs text-slate-500">Complete tasks to hit your daily goal</p>
              </div>
              <button
                onClick={() => {
                  setTaskToEdit(null);
                  setTaskModalOpen(true);
                }}
                className="p-1.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                title="Add task"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Progress Bar */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-500">Progress</span>
                <span className="font-bold text-slate-800">{completedTasks} of {totalTasks} Done</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${taskProgress}%` }}
                />
              </div>
            </div>

            {/* Task list preview */}
            <div className="space-y-3 pt-2">
              {studyTasks.slice(0, 4).map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggleComplete={toggleTaskComplete}
                  onDelete={deleteTask}
                  onEdit={(t) => {
                    setTaskToEdit(t);
                    setTaskModalOpen(true);
                  }}
                />
              ))}

              {studyTasks.length === 0 && (
                <p className="text-xs text-slate-400 text-center py-4">
                  No tasks created yet. Click "+" to plan your first study block!
                </p>
              )}
            </div>

            <button
              onClick={() => navigate("/planner")}
              className="w-full py-2.5 text-center text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-xl transition border border-dashed border-blue-200"
            >
              Open Full Interactive Planner →
            </button>
          </div>

          {/* Quick Help Card */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm text-xs text-slate-600 space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-blue-600" /> College Guidance Desk
            </h4>
            <p className="leading-relaxed">
              Need assistance selecting optional subjects or scheduling seminars for your college campus?
            </p>
            <div className="pt-1">
              <a
                href="mailto:guidance@examawareness.org"
                className="text-blue-600 font-bold hover:underline"
              >
                guidance@examawareness.org
              </a>
            </div>
          </div>

        </div>

      </div>

      <TaskFormModal
        isOpen={taskModalOpen}
        onClose={() => setTaskModalOpen(false)}
        onSave={saveTask}
        taskToEdit={taskToEdit}
      />
    </div>
  );
};
