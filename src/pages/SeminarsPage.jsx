import React, { useState, useMemo } from "react";
import {
  Calendar,
  Search,
  Filter,
  Video,
  MapPin,
  Sparkles,
  CheckCircle2,
  Users,
  PlayCircle
} from "lucide-react";
import { Badge } from "../components/common/Badge";
import { SeminarCard } from "../components/seminars/SeminarCard";
import { useData } from "../context/DataContext";

export const SeminarsPage = ({
  navigate,
  onRegisterClick
}) => {
  const { seminars } = useData();

  const [activeTab, setActiveTab] = useState("all"); // all, upcoming, online, offline, completed
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    const set = new Set();
    seminars.forEach((s) => {
      if (s.category) set.add(s.category);
    });
    return Array.from(set);
  }, [seminars]);

  const filteredSeminars = useMemo(() => {
    return seminars.filter((seminar) => {
      // Tab filter
      if (activeTab === "upcoming" && seminar.status !== "upcoming") return false;
      if (activeTab === "completed" && seminar.status !== "completed") return false;
      if (activeTab === "online" && seminar.mode !== "Online") return false;
      if (activeTab === "offline" && seminar.mode !== "Offline" && seminar.mode !== "Hybrid") return false;

      // Category filter
      if (selectedCategory !== "All" && seminar.category !== selectedCategory) return false;

      // Search filter
      const query = searchQuery.toLowerCase().trim();
      if (!query) return true;

      return (
        seminar.title.toLowerCase().includes(query) ||
        seminar.topic?.toLowerCase().includes(query) ||
        seminar.speaker?.name?.toLowerCase().includes(query) ||
        seminar.venue?.toLowerCase().includes(query) ||
        seminar.category?.toLowerCase().includes(query)
      );
    });
  }, [seminars, activeTab, selectedCategory, searchQuery]);

  // Counts
  const upcomingCount = seminars.filter((s) => s.status === "upcoming").length;
  const completedCount = seminars.filter((s) => s.status === "completed").length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="primary" size="md">Direct Expert Mentorship</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Seminars & Guidance Sessions
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed">
          Interactive offline seminars in college auditoriums and live online webinars. Learn directly from successful candidates, former civil servants, and top faculty.
        </p>
      </div>

      {/* Tabs & Search */}
      <div className="space-y-4">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-1 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition shrink-0 ${
              activeTab === "all"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            All Sessions ({seminars.length})
          </button>
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition shrink-0 ${
              activeTab === "upcoming"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Upcoming Sessions ({upcomingCount})
          </button>
          <button
            onClick={() => setActiveTab("online")}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition shrink-0 flex items-center gap-1.5 ${
              activeTab === "online"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Video className="w-3.5 h-3.5" /> Online Webinars
          </button>
          <button
            onClick={() => setActiveTab("offline")}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition shrink-0 flex items-center gap-1.5 ${
              activeTab === "offline"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <MapPin className="w-3.5 h-3.5" /> Offline Seminars
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition shrink-0 flex items-center gap-1.5 ${
              activeTab === "completed"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <PlayCircle className="w-3.5 h-3.5" /> Completed & Recordings ({completedCount})
          </button>
        </div>

        {/* Search & Category Pills */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, speaker name, city or venue..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto scrollbar-none">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition ${
                selectedCategory === "All"
                  ? "bg-slate-800 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition ${
                  selectedCategory === cat
                    ? "bg-slate-800 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Seminars Grid */}
      {filteredSeminars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSeminars.map((seminar) => (
            <SeminarCard
              key={seminar.id}
              seminar={seminar}
              onRegisterClick={onRegisterClick}
              onViewDetails={(id) => navigate(`/seminars/${id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/90 shadow-sm space-y-3">
          <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No sessions matched your criteria</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try resetting your filters or search keywords to view other upcoming seminars.
          </p>
          <button
            onClick={() => {
              setActiveTab("all");
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-xs font-bold hover:bg-blue-100 transition"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* College Host Request Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
            For College Deans & Student Councils
          </span>
          <h3 className="text-xl font-bold text-white">
            Want to Host a Competitive Exam Seminar on Your Campus?
          </h3>
          <p className="text-xs text-blue-200 max-w-xl leading-relaxed">
            Our network of retired civil servants and expert educators conducts free 2-hour offline awareness workshops for college students across Maharashtra and India.
          </p>
        </div>
        <a
          href="mailto:host-seminar@examawareness.org?subject=College%20Seminar%20Request"
          className="px-5 py-3 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-blue-50 shrink-0 transition"
        >
          Request Campus Seminar
        </a>
      </div>

    </div>
  );
};
