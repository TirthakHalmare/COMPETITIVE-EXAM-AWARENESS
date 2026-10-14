import React, { useState } from "react";
import {
  ArrowLeft,
  Bookmark,
  Calendar,
  Clock,
  GraduationCap,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  BookOpen,
  Award,
  Users,
  CheckCircle2,
  FileText,
  DollarSign,
  ChevronRight
} from "lucide-react";
import { Badge } from "../components/common/Badge";
import { useData } from "../context/DataContext";
import { useToast } from "../common/Toast";
import { SeminarCard } from "../components/seminars/SeminarCard";

export const ExamDetailsPage = ({
  examId,
  navigate,
  onRegisterSeminar
}) => {
  const { exams, seminars, toggleBookmark, isBookmarked } = useData();
  const { success } = useToast();

  const exam = exams.find((e) => e.id === examId) || exams[0];
  const saved = isBookmarked("exams", exam?.id);

  const [activeTab, setActiveTab] = useState("overview"); // overview, syllabus, dates, books

  if (!exam) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Exam not found</h2>
        <button
          onClick={() => navigate("/exams")}
          className="text-sm font-semibold text-blue-600 hover:underline"
        >
          ← Return to Exams Directory
        </button>
      </div>
    );
  }

  const handleBookmark = () => {
    toggleBookmark("exams", exam.id);
    success(saved ? "Removed from bookmarks" : "Bookmarked exam for tracking!");
  };

  // Find related seminars
  const relatedSeminars = seminars.filter(
    (s) =>
      s.category?.toLowerCase().includes(exam.category?.toLowerCase()) ||
      exam.category?.toLowerCase().includes(s.category?.toLowerCase()) ||
      s.title.toLowerCase().includes(exam.name.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back button */}
      <button
        onClick={() => navigate("/exams")}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Examinations Directory
      </button>

      {/* HEADER CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="primary" size="md">
                {exam.category}
              </Badge>
              <Badge variant="default" size="md">
                {exam.difficultyLevel} Difficulty
              </Badge>
              {exam.importantDates?.isTentative && (
                <Badge variant="warning" size="md" icon={AlertTriangle}>
                  Tentative Schedule
                </Badge>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {exam.name}
            </h1>
            <p className="text-sm font-medium text-slate-500">
              {exam.fullName} • Conducted by <span className="font-semibold text-slate-700">{exam.conductingBody}</span>
            </p>
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto">
            <button
              onClick={handleBookmark}
              className={`flex-1 md:flex-none px-4 py-2.5 rounded-xl border font-bold text-xs flex items-center justify-center gap-1.5 transition ${
                saved
                  ? "bg-blue-50 border-blue-200 text-blue-700"
                  : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <Bookmark className={`w-4 h-4 ${saved ? "fill-blue-600" : ""}`} />
              {saved ? "Saved to Bookmarks" : "Save Exam"}
            </button>

            {exam.applicationInfo?.officialWebsite && (
              <a
                href={exam.applicationInfo.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20 transition"
              >
                Official Portal <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed max-w-4xl border-t border-slate-100 pt-4">
          {exam.shortDesc}
        </p>

        {/* Highlight Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
          <div>
            <span className="text-slate-400 block uppercase font-bold text-[10px]">Prep Window</span>
            <span className="font-bold text-slate-800 text-sm mt-0.5 block">{exam.averagePrepTime || "8 - 12 Months"}</span>
          </div>
          <div>
            <span className="text-slate-400 block uppercase font-bold text-[10px]">Sample Vacancies</span>
            <span className="font-bold text-slate-800 text-sm mt-0.5 block truncate" title={exam.vacanciesSample}>
              {exam.vacanciesSample || "Check Notification"}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block uppercase font-bold text-[10px]">Next Prelims</span>
            <span className="font-bold text-blue-700 text-sm mt-0.5 block">
              {exam.importantDates?.prelimsDate || "Tentative"}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block uppercase font-bold text-[10px]">Application Fee</span>
            <span className="font-bold text-slate-800 text-sm mt-0.5 block">{exam.applicationInfo?.fee || "₹100"}</span>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition ${
            activeTab === "overview"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Eligibility & Selection Stages
        </button>
        <button
          onClick={() => setActiveTab("syllabus")}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition ${
            activeTab === "syllabus"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Detailed Syllabus Breakdown
        </button>
        <button
          onClick={() => setActiveTab("dates")}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition ${
            activeTab === "dates"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Important Dates & Notice Policy
        </button>
        <button
          onClick={() => setActiveTab("books")}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition ${
            activeTab === "books"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Recommended Books & Mentorship
        </button>
      </div>

      {/* TAB CONTENT: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Eligibility Criteria */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-slate-900 text-base">Eligibility & Qualifications</h3>
            </div>

            <div className="space-y-3 text-xs leading-relaxed">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">Educational Qualification</span>
                <p className="text-slate-700">{exam.eligibility?.education}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">Age Limitations & Relaxations</span>
                <p className="text-slate-700">{exam.eligibility?.ageLimit}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">Permissible Attempts</span>
                <p className="text-slate-700">{exam.eligibility?.attempts}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">Nationality / Citizenship</span>
                <p className="text-slate-700">{exam.eligibility?.nationality || "Indian Citizen"}</p>
              </div>
            </div>
          </div>

          {/* Selection Stages */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-slate-900 text-base">Selection Process & Stages</h3>
            </div>

            <div className="space-y-3">
              {exam.selectionProcess?.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px] mt-0.5">
                    {idx + 1}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900">{step.stage}</h4>
                    <p className="text-slate-600 leading-relaxed">{step.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB CONTENT: SYLLABUS */}
      {activeTab === "syllabus" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Official Syllabus Modules
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Aligned with the latest notification released by {exam.conductingBody}.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Prelims */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 font-bold text-xs uppercase tracking-wider">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  Preliminary / Tier-1 Core Topics
                </div>
                <div className="space-y-2">
                  {exam.syllabus?.prelims?.map((topic, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mains */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-indigo-900 font-bold text-xs uppercase tracking-wider">
                  <FileText className="w-4 h-4 text-indigo-600" />
                  Main Examination / Tier-2 / Advanced Topics
                </div>
                <div className="space-y-2">
                  {exam.syllabus?.mains?.map((topic, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: DATES */}
      {activeTab === "dates" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Examination Calendar & Timeline
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Verified against official gazette releases
                </p>
              </div>

              {exam.importantDates?.isTentative && (
                <Badge variant="warning" size="md" icon={AlertTriangle}>
                  Tentative Schedule
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                <span className="text-slate-400 uppercase font-bold text-[10px]">Notification Release</span>
                <span className="font-bold text-slate-900 text-sm block">
                  {exam.importantDates?.notificationDate || "Annually"}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 text-xs space-y-1">
                <span className="text-blue-600 uppercase font-bold text-[10px]">Prelims / Tier-1 Date</span>
                <span className="font-bold text-blue-900 text-sm block">
                  {exam.importantDates?.prelimsDate || "Check Commission Website"}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                <span className="text-slate-400 uppercase font-bold text-[10px]">Mains / Tier-2 Date</span>
                <span className="font-bold text-slate-900 text-sm block">
                  {exam.importantDates?.mainsDate || "Following Prelims results"}
                </span>
              </div>
            </div>

            {/* Official notice declaration */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-1">
              <span className="font-bold flex items-center gap-1.5 text-amber-800">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                Commission Calendar Notice
              </span>
              <p className="leading-relaxed">
                {exam.importantDates?.officialNoticeNote || "Dates are based on annual commission calendars. Please confirm with the official portal."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: BOOKS & MENTORSHIP */}
      {activeTab === "books" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900">
              Recommended Standard Reference Books
            </h3>
            <p className="text-xs text-slate-500">
              Verified booklist recommended by successful rank holders and guidance educators.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {exam.recommendedBooks?.map((book, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-800 flex items-center gap-2.5"
                >
                  <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{book}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* RELATED SEMINARS SECTION */}
      {relatedSeminars.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Upcoming Guidance Seminars for {exam.name}
              </h3>
              <p className="text-xs text-slate-500">
                Register for free expert sessions covering this syllabus
              </p>
            </div>
            <button
              onClick={() => navigate("/seminars")}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              All Seminars <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedSeminars.map((sem) => (
              <SeminarCard
                key={sem.id}
                seminar={sem}
                onRegisterClick={onRegisterSeminar}
                onViewDetails={(id) => navigate(`/seminars/${id}`)}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
