import React, { useState, useMemo } from "react";
import { BookOpen, Search, Filter, ShieldCheck, HelpCircle } from "lucide-react";
import { ExamCard } from "../components/exams/ExamCard";
import { ExamFilterBar } from "../components/exams/ExamFilterBar";
import { useData } from "../context/DataContext";
import { Badge } from "../components/common/Badge";

export const ExamsPage = ({ navigate }) => {
  const { exams } = useData();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedQualification, setSelectedQualification] = useState("All");

  const categories = useMemo(() => {
    const set = new Set();
    exams.forEach((e) => {
      if (e.category) set.add(e.category);
    });
    return Array.from(set);
  }, [exams]);

  const filteredExams = useMemo(() => {
    return exams.filter((exam) => {
      // Text search
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        exam.name.toLowerCase().includes(query) ||
        exam.fullName?.toLowerCase().includes(query) ||
        exam.conductingBody?.toLowerCase().includes(query) ||
        exam.category?.toLowerCase().includes(query) ||
        exam.shortDesc?.toLowerCase().includes(query) ||
        exam.tags?.some((t) => t.toLowerCase().includes(query));

      // Category filter
      const matchesCategory =
        selectedCategory === "All" || exam.category === selectedCategory;

      // Qualification filter
      let matchesQual = true;
      if (selectedQualification === "12th") {
        matchesQual =
          exam.eligibility?.education?.toLowerCase().includes("12th") ||
          exam.eligibility?.education?.toLowerCase().includes("undergraduate");
      } else if (selectedQualification === "Graduate") {
        matchesQual =
          exam.eligibility?.education?.toLowerCase().includes("graduation") ||
          exam.eligibility?.education?.toLowerCase().includes("bachelor") ||
          exam.eligibility?.education?.toLowerCase().includes("degree");
      }

      return matchesSearch && matchesCategory && matchesQual;
    });
  }, [exams, searchQuery, selectedCategory, selectedQualification]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="primary" size="md">Official Commission Guide</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Competitive Examinations Directory
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed">
          Comprehensive, verified guide to central, state, banking, defence, and technical examinations in India. Learn eligibility criteria, syllabus modules, and selection procedures.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        <ExamFilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
        />

        {/* Secondary Qualification Filter */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 px-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-600">Qualification:</span>
            <button
              onClick={() => setSelectedQualification("All")}
              className={`px-2.5 py-1 rounded-lg border transition ${
                selectedQualification === "All"
                  ? "bg-slate-800 text-white border-slate-800"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
            >
              Any
            </button>
            <button
              onClick={() => setSelectedQualification("Graduate")}
              className={`px-2.5 py-1 rounded-lg border transition ${
                selectedQualification === "Graduate"
                  ? "bg-slate-800 text-white border-slate-800"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
            >
              Bachelor's / Graduate
            </button>
            <button
              onClick={() => setSelectedQualification("12th")}
              className={`px-2.5 py-1 rounded-lg border transition ${
                selectedQualification === "12th"
                  ? "bg-slate-800 text-white border-slate-800"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
            >
              12th Pass / Intermediate
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Showing {filteredExams.length} examinations</span>
          </div>
        </div>
      </div>

      {/* Exam Grid */}
      {filteredExams.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredExams.map((exam) => (
            <ExamCard
              key={exam.id}
              exam={exam}
              onSelect={(id) => navigate(`/exams/${id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/90 shadow-sm space-y-3">
          <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No examinations matched your filters</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search query or reset category and qualification filters to view all exams.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
              setSelectedQualification("All");
            }}
            className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-xs font-bold hover:bg-blue-100 transition"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Policy Notice Box */}
      <div className="bg-slate-100 rounded-2xl p-4 sm:p-5 text-xs text-slate-600 border border-slate-200 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-bold text-slate-800">Official Notice & Calendar Policy</h4>
          <p className="leading-relaxed">
            Our editorial mentors regularly update exam notifications from official commission gazettes. Important dates tagged with <em>"Tentative"</em> are projected according to annual notification cycles. Always review final dates on the official conducting portal.
          </p>
        </div>
      </div>

    </div>
  );
};
