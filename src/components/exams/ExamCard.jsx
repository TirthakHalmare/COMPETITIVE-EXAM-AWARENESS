import React from "react";
import {
  Bookmark,
  Calendar,
  Clock,
  GraduationCap,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  Award
} from "lucide-react";
import { Badge } from "../common/Badge";
import { useData } from "../../context/DataContext";
import { useToast } from "../common/Toast";

export const ExamCard = ({ exam, onSelect }) => {
  const { toggleBookmark, isBookmarked } = useData();
  const { success } = useToast();
  const saved = isBookmarked("exams", exam.id);

  const handleBookmark = (e) => {
    e.stopPropagation();
    toggleBookmark("exams", exam.id);
    success(saved ? `Removed ${exam.name} from saved items` : `Bookmarked ${exam.name}!`);
  };

  const getDifficultyBadge = (diff) => {
    if (diff?.toLowerCase().includes("high")) return "danger";
    if (diff?.toLowerCase().includes("moderate")) return "warning";
    return "success";
  };

  return (
    <div
      onClick={() => onSelect(exam.id)}
      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-blue-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      <div className="p-5 sm:p-6">
        {/* Top Meta: Category & Bookmark */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap gap-1.5 items-center">
            <Badge variant="primary" size="sm">
              {exam.category}
            </Badge>
            {exam.importantDates?.isTentative && (
              <Badge variant="warning" size="sm" icon={ShieldAlert}>
                Tentative Dates
              </Badge>
            )}
          </div>
          <button
            type="button"
            onClick={handleBookmark}
            className={`p-2 rounded-xl transition ${
              saved
                ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            }`}
            title={saved ? "Remove bookmark" : "Save exam"}
          >
            <Bookmark className={`w-4 h-4 ${saved ? "fill-blue-600" : ""}`} />
          </button>
        </div>

        {/* Title and Body */}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
          {exam.name}
        </h3>
        <p className="text-xs text-slate-500 font-medium mb-3">
          {exam.conductingBody}
        </p>
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
          {exam.shortDesc}
        </p>

        {/* Quick Highlights Grid */}
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-2 text-xs text-slate-600">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-blue-500" /> Qualification
            </span>
            <span className="font-semibold text-slate-800 text-right truncate max-w-[170px]" title={exam.eligibility?.education}>
              {exam.eligibility?.education?.split(".")[0] || "Graduate / 12th"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-500" /> Prep Duration
            </span>
            <span className="font-semibold text-slate-800">{exam.averagePrepTime || "6 - 12 Months"}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-500" /> Next Prelims / Exam
            </span>
            <span className="font-semibold text-slate-800">
              {exam.importantDates?.prelimsDate || "Check Notification"}
            </span>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="px-5 sm:px-6 py-3.5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Badge variant={getDifficultyBadge(exam.difficultyLevel)} size="sm">
            {exam.difficultyLevel} Level
          </Badge>
        </div>
        <span className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
          Full Syllabus & Details <ChevronRight className="w-4 h-4" />
        </span>
      </div>
    </div>
  );
};
