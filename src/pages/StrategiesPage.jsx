import React, { useState } from "react";
import {
  Target,
  Calendar,
  Clock,
  CheckSquare,
  Brain,
  AlertTriangle,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  Download
} from "lucide-react";
import { Badge } from "../components/common/Badge";
import { PREPARATION_STRATEGIES } from "../data/sampleData";

export const StrategiesPage = ({ navigate }) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedSection, setExpandedSection] = useState(PREPARATION_STRATEGIES[0]?.id);

  const categories = [
    { id: "all", label: "All Strategies" },
    { id: "Exam Strategies", label: "Exam Blueprints" },
    { id: "Planning", label: "Timetables" },
    { id: "Productivity", label: "Time Management" },
    { id: "Testing", label: "Mock Test Strategy" },
    { id: "Memory", label: "Revision Methods" },
    { id: "Warnings", label: "Mistakes to Avoid" },
  ];

  const filteredStrategies = activeCategory === "all"
    ? PREPARATION_STRATEGIES
    : PREPARATION_STRATEGIES.filter((s) => s.category === activeCategory);

  const getIcon = (iconName) => {
    switch (iconName) {
      case "Target": return <Target className="w-5 h-5 text-blue-600" />;
      case "Calendar": return <Calendar className="w-5 h-5 text-indigo-600" />;
      case "Clock": return <Clock className="w-5 h-5 text-amber-500" />;
      case "CheckSquare": return <CheckSquare className="w-5 h-5 text-emerald-600" />;
      case "Brain": return <Brain className="w-5 h-5 text-purple-600" />;
      case "AlertTriangle": return <AlertTriangle className="w-5 h-5 text-rose-500" />;
      default: return <BookOpen className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="primary" size="md">Strategic Blueprints</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Preparation Strategies & Resources
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed">
          Tested methodologies, daily timetable models, spaced repetition protocols, and mock exam analysis frameworks formulated by educators and top rankers.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
              activeCategory === cat.id
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Strategy Cards Accordion List */}
      <div className="space-y-6">
        {filteredStrategies.map((strat) => {
          const isExpanded = expandedSection === strat.id;

          return (
            <div
              key={strat.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden transition-all duration-300"
            >
              {/* Header */}
              <div
                onClick={() => setExpandedSection(isExpanded ? null : strat.id)}
                className="p-6 cursor-pointer flex items-center justify-between gap-4 hover:bg-slate-50/70 transition"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0">
                    {getIcon(strat.icon)}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      {strat.category}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">{strat.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{strat.summary}</p>
                  </div>
                </div>

                <div className="p-2 rounded-xl text-slate-400 hover:text-slate-600 transition">
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>

              {/* Collapsible Content */}
              {isExpanded && (
                <div className="px-6 pb-6 pt-2 border-t border-slate-100 space-y-6 animate-in fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {strat.points?.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-50/90 rounded-2xl p-5 border border-slate-200/80 space-y-3"
                      >
                        <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-600" />
                          {item.exam}
                        </h4>

                        <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                          {item.steps.map((step, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Contextual Action Banner */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                    <span className="font-medium text-blue-900">
                      Put this strategy into practice with custom subject tasks and durations.
                    </span>
                    <button
                      onClick={() => navigate("/planner")}
                      className="px-4 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shrink-0"
                    >
                      Schedule in Study Planner →
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* QUICK DOWNLOADABLE TIMETABLE TEMPLATES */}
      <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <Badge variant="purple" size="sm">Aspirant Blueprints</Badge>
            <h3 className="text-xl font-bold text-white">Daily Time-Blocking Rules for College Students</h3>
            <p className="text-xs text-slate-300 max-w-xl">
              Follow the <strong>3+1 Formula</strong>: 3 hours of core theory/PYQ solving + 1 hour of current affairs revision every day yields over 1,400 hours of quality preparation in a single academic year!
            </p>
          </div>
          <button
            onClick={() => navigate("/planner")}
            className="px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-xs font-bold shrink-0 transition"
          >
            Open Interactive Planner
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
          <div className="bg-white/10 p-4 rounded-2xl border border-white/15 space-y-2">
            <span className="font-bold text-blue-300 uppercase tracking-wider text-[10px]">Morning Slot</span>
            <h4 className="font-bold text-white text-sm">6:30 AM - 8:00 AM</h4>
            <p className="text-slate-300">High-cognitive subjects: Indian Polity, Quantitative Aptitude, or Engineering Math.</p>
          </div>

          <div className="bg-white/10 p-4 rounded-2xl border border-white/15 space-y-2">
            <span className="font-bold text-emerald-300 uppercase tracking-wider text-[10px]">Commute / Gaps</span>
            <h4 className="font-bold text-white text-sm">Free College Hours</h4>
            <p className="text-slate-300">Listen to daily editorial analysis audio, review flashcards, or solve 15 reasoning puzzles.</p>
          </div>

          <div className="bg-white/10 p-4 rounded-2xl border border-white/15 space-y-2">
            <span className="font-bold text-purple-300 uppercase tracking-wider text-[10px]">Evening Block</span>
            <h4 className="font-bold text-white text-sm">7:30 PM - 9:30 PM</h4>
            <p className="text-slate-300">Previous year questions (PYQs), answer writing practice, and 15-minute daily recap.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
