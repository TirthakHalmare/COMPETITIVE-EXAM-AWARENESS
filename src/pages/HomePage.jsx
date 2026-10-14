import React from "react";
import {
  GraduationCap,
  Calendar,
  Users,
  Compass,
  ArrowRight,
  Sparkles,
  BookOpen,
  Award,
  Video,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  TrendingUp
} from "lucide-react";
import { Badge } from "../components/common/Badge";
import { useData } from "../context/DataContext";
import { ExamCard } from "../components/exams/ExamCard";
import { SeminarCard } from "../components/seminars/SeminarCard";

export const HomePage = ({ navigate, onRegisterSeminar }) => {
  const { exams, seminars, announcements } = useData();

  // Find the next upcoming seminar
  const upcomingSeminars = seminars.filter((s) => s.status === "upcoming");
  const nextSeminar = upcomingSeminars[0];
  const popularExams = exams.slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-10 sm:pt-16 pb-12 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* Mission Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>National Student Awareness Initiative 2026</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Master Competitive Exams with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Expert Guidance & Seminars
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Bridge the gap between college studies and government careers. Join offline college seminars and live webinars guided by former civil servants, top rankers, and seasoned educators.
            </p>

            {/* Hero Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => navigate("/seminars")}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 hover:scale-105 transition-all"
              >
                <Calendar className="w-4 h-4" /> Browse Guidance Seminars
              </button>

              <button
                onClick={() => navigate("/exams")}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-bold text-sm shadow-sm flex items-center justify-center gap-2 transition"
              >
                <BookOpen className="w-4 h-4 text-blue-600" /> Explore 8+ Exam Streams
              </button>
            </div>

            {/* Verified Policy Note */}
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Official commission syllabus verified • 100% Free guidance for college students</span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white rounded-3xl border border-slate-200/90 shadow-sm text-center">
          <div className="p-4 border-r border-slate-100 last:border-none">
            <span className="block text-2xl sm:text-3xl font-extrabold text-blue-600">15,000+</span>
            <span className="text-xs sm:text-sm font-semibold text-slate-500 mt-1 block">Students Mentored</span>
          </div>
          <div className="p-4 border-r border-slate-100 last:border-none">
            <span className="block text-2xl sm:text-3xl font-extrabold text-indigo-600">8 Streams</span>
            <span className="text-xs sm:text-sm font-semibold text-slate-500 mt-1 block">Central & State Exams</span>
          </div>
          <div className="p-4 border-r border-slate-100 last:border-none">
            <span className="block text-2xl sm:text-3xl font-extrabold text-emerald-600">45+ Sessions</span>
            <span className="text-xs sm:text-sm font-semibold text-slate-500 mt-1 block">Seminars & Webinars</span>
          </div>
          <div className="p-4">
            <span className="block text-2xl sm:text-3xl font-extrabold text-purple-600">100% Free</span>
            <span className="text-xs sm:text-sm font-semibold text-slate-500 mt-1 block">Awareness Resources</span>
          </div>
        </div>
      </section>

      {/* NEXT LIVE SEMINAR SPOTLIGHT */}
      {nextSeminar && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-10 shadow-2xl overflow-hidden border border-blue-800">
            
            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="space-y-4 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/30 border border-blue-400/30 text-blue-200 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-blue-300" />
                  Upcoming Flagship Seminar
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight text-white">
                  {nextSeminar.title}
                </h2>

                <p className="text-sm text-blue-100/90 leading-relaxed">
                  {nextSeminar.description}
                </p>

                {/* Speaker Snippet */}
                <div className="flex items-center gap-3 pt-1">
                  <img
                    src={nextSeminar.speaker?.avatar}
                    alt={nextSeminar.speaker?.name}
                    className="w-12 h-12 rounded-xl object-cover border-2 border-blue-400/40"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white">{nextSeminar.speaker?.name}</h4>
                    <p className="text-xs text-blue-200">{nextSeminar.speaker?.designation}</p>
                  </div>
                </div>

                {/* Logistics */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-blue-200 pt-2">
                  <span className="flex items-center gap-1.5 font-semibold bg-white/10 px-3 py-1.5 rounded-xl">
                    <Calendar className="w-4 h-4 text-blue-300" /> {nextSeminar.date}
                  </span>
                  <span className="flex items-center gap-1.5 font-semibold bg-white/10 px-3 py-1.5 rounded-xl">
                    <Clock className="w-4 h-4 text-blue-300" /> {nextSeminar.time}
                  </span>
                  <span className="flex items-center gap-1.5 font-semibold bg-white/10 px-3 py-1.5 rounded-xl">
                    {nextSeminar.mode === "Online" ? <Video className="w-4 h-4 text-emerald-300" /> : <MapPin className="w-4 h-4 text-purple-300" />}
                    {nextSeminar.mode} Mode
                  </span>
                </div>
              </div>

              {/* Action Side */}
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center w-full lg:w-72 shrink-0 space-y-4">
                <div>
                  <span className="text-xs uppercase text-blue-200 font-bold tracking-wider block">Seats Left</span>
                  <span className="text-3xl font-extrabold text-white mt-1 block">
                    {nextSeminar.availableSeats} / {nextSeminar.totalSeats}
                  </span>
                  <p className="text-[11px] text-blue-200 mt-1">Admission is free on first-come reservation</p>
                </div>

                <button
                  onClick={() => onRegisterSeminar(nextSeminar)}
                  className="w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-bold text-sm shadow-lg transition hover:scale-105"
                >
                  Reserve My Free Seat
                </button>

                <button
                  onClick={() => navigate(`/seminars/${nextSeminar.id}`)}
                  className="w-full py-2 text-xs font-semibold text-blue-200 hover:text-white transition"
                >
                  View Schedule & Topics →
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* POPULAR COMPETITIVE EXAMINATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <Badge variant="primary" size="sm">Exam Directory</Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Popular Competitive Examinations
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Explore eligibility, selection process, syllabus, and tentative calendars.
            </p>
          </div>

          <button
            onClick={() => navigate("/exams")}
            className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 shrink-0"
          >
            View All 8+ Categories <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularExams.map((exam) => (
            <ExamCard
              key={exam.id}
              exam={exam}
              onSelect={(id) => navigate(`/exams/${id}`)}
            />
          ))}
        </div>
      </section>

      {/* 4 PILLARS OF STUDENT PREPARATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="purple" size="sm">Our Framework</Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            How We Guide College Aspirants
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Structured guidance designed specifically for undergraduate and graduating students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Expert-Led Seminars</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Interactive sessions with serving and retired civil servants, bank managers, and engineers decoding exam patterns.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Verified Syllabus & Portals</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No fake dates or clickbait deadlines. Clear distinctions between official notices and tentative annual projections.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Preparation Blueprints</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Timetables for college students balancing coursework with 3-4 hours of daily dedicated competitive study.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Interactive Study Planner</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Create daily subject tasks, set revision targets, and monitor your weekly study streaks right from your browser.
            </p>
          </div>
        </div>
      </section>

      {/* LATEST ANNOUNCEMENTS BANNER */}
      {announcements.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
                <h3 className="text-lg font-bold text-white">Latest Exam & Seminar Updates</h3>
              </div>
              <button
                onClick={() => navigate("/notifications")}
                className="text-xs font-semibold text-blue-400 hover:text-blue-300"
              >
                Notification Center →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {announcements.slice(0, 3).map((ann) => (
                <div
                  key={ann.id}
                  onClick={() => ann.link && navigate(ann.link)}
                  className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700/80 hover:border-slate-600 cursor-pointer transition space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-950/70 px-2 py-0.5 rounded">
                      {ann.badge || "Update"}
                    </span>
                    <span className="text-[11px] text-slate-400">{ann.date}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-100 line-clamp-1">{ann.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{ann.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CALL TO ACTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-3xl font-extrabold text-slate-900">
          Ready to Start Your Exam Preparation Journey?
        </h2>
        <p className="text-slate-600 max-w-xl mx-auto text-sm leading-relaxed">
          Set up your student profile, configure your target examinations, and register for free upcoming guidance seminars today.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition"
          >
            Go to Student Dashboard
          </button>
          <button
            onClick={() => navigate("/planner")}
            className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition"
          >
            Open Study Planner
          </button>
        </div>
      </section>

    </div>
  );
};
