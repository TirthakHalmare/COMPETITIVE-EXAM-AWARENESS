import React, { useState } from "react";
import { Bookmark, Calendar, BookOpen, Trash2, ChevronRight, HelpCircle } from "lucide-react";
import { Badge } from "../components/common/Badge";
import { useData } from "../context/DataContext";
import { useToast } from "../common/Toast";
import { ExamCard } from "../components/exams/ExamCard";
import { SeminarCard } from "../components/seminars/SeminarCard";

export const SavedPage = ({ navigate, onRegisterSeminar }) => {
  const { exams, seminars, saved, toggleBookmark } = useData();
  const { success } = useToast();

  const [activeTab, setActiveTab] = useState("exams"); // exams or seminars

  const savedExams = exams.filter((e) => saved.exams?.includes(e.id));
  const savedSeminars = seminars.filter((s) => saved.seminars?.includes(s.id));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div>
        <Badge variant="primary" size="md">Personal Library</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
          Saved Exams & Guidance Sessions
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Quickly access your bookmarked competitive examinations, syllabus guides, and guidance seminars.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1">
        <button
          onClick={() => setActiveTab("exams")}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition flex items-center gap-2 ${
            activeTab === "exams"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          Saved Exams ({savedExams.length})
        </button>

        <button
          onClick={() => setActiveTab("seminars")}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition flex items-center gap-2 ${
            activeTab === "seminars"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          Saved Seminars ({savedSeminars.length})
        </button>
      </div>

      {/* Tab Content: Exams */}
      {activeTab === "exams" && (
        <div>
          {savedExams.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedExams.map((exam) => (
                <ExamCard
                  key={exam.id}
                  exam={exam}
                  onSelect={(id) => navigate(`/exams/${id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/90 shadow-sm space-y-3">
              <Bookmark className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No exams saved yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Explore our directory of 8+ exam streams and bookmark target exams to keep track of their timelines and syllabus.
              </p>
              <button
                onClick={() => navigate("/exams")}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow hover:bg-blue-700 transition"
              >
                Browse Exams Directory
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab Content: Seminars */}
      {activeTab === "seminars" && (
        <div>
          {savedSeminars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedSeminars.map((seminar) => (
                <SeminarCard
                  key={seminar.id}
                  seminar={seminar}
                  onRegisterClick={onRegisterSeminar}
                  onViewDetails={(id) => navigate(`/seminars/${id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/90 shadow-sm space-y-3">
              <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No guidance sessions saved</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Find offline and online sessions by retired civil servants and educators to bookmark or reserve your admission pass.
              </p>
              <button
                onClick={() => navigate("/seminars")}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow hover:bg-blue-700 transition"
              >
                Explore Seminars
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
