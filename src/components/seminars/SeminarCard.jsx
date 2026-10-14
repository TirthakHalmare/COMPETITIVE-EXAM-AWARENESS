import React from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Video,
  Users,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Bookmark
} from "lucide-react";
import { Badge } from "../common/Badge";
import { useData } from "../../context/DataContext";
import { useToast } from "../common/Toast";

export const SeminarCard = ({
  seminar,
  onRegisterClick,
  onViewDetails
}) => {
  const { isRegisteredForSeminar, toggleBookmark, isBookmarked } = useData();
  const { success } = useToast();

  const isRegistered = isRegisteredForSeminar(seminar.id);
  const isSaved = isBookmarked("seminars", seminar.id);
  const isCompleted = seminar.status === "completed";

  const totalSeats = seminar.totalSeats || 100;
  const registeredCount = seminar.registeredCount || 0;
  const availableSeats = seminar.availableSeats !== undefined ? seminar.availableSeats : Math.max(0, totalSeats - registeredCount);
  const percentFilled = Math.min(100, Math.round((registeredCount / totalSeats) * 100));

  const handleBookmark = (e) => {
    e.stopPropagation();
    toggleBookmark("seminars", seminar.id);
    success(isSaved ? "Session removed from saved list" : "Session bookmarked!");
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
      <div className="p-5 sm:p-6">
        
        {/* Top Badges & Bookmark */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap gap-1.5 items-center">
            <Badge
              variant={seminar.mode === "Online" ? "primary" : seminar.mode === "Offline" ? "purple" : "indigo"}
              size="sm"
              icon={seminar.mode === "Online" ? Video : MapPin}
            >
              {seminar.mode} Session
            </Badge>

            {isCompleted ? (
              <Badge variant="default" size="sm">
                Completed
              </Badge>
            ) : availableSeats <= 10 && availableSeats > 0 ? (
              <Badge variant="danger" size="sm">
                Fast Filling ({availableSeats} left)
              </Badge>
            ) : (
              <Badge variant="success" size="sm">
                Upcoming
              </Badge>
            )}

            {isRegistered && (
              <Badge variant="success" size="sm" icon={CheckCircle2}>
                Registered
              </Badge>
            )}
          </div>

          <button
            type="button"
            onClick={handleBookmark}
            className={`p-1.5 rounded-lg transition ${
              isSaved
                ? "bg-blue-50 text-blue-600"
                : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            }`}
            title="Bookmark session"
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? "fill-blue-600" : ""}`} />
          </button>
        </div>

        {/* Title & Topic */}
        <h3
          onClick={() => onViewDetails(seminar.id)}
          className="text-lg font-bold text-slate-900 hover:text-blue-600 cursor-pointer transition leading-snug mb-1"
        >
          {seminar.title}
        </h3>
        <p className="text-xs font-semibold text-blue-700 mb-3">
          Topic: {seminar.topic}
        </p>

        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
          {seminar.description}
        </p>

        {/* Speaker Profile Mini-Card */}
        {seminar.speaker && (
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100 mb-4">
            <img
              src={seminar.speaker.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"}
              alt={seminar.speaker.name}
              className="w-10 h-10 rounded-full object-cover border border-slate-200"
            />
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-slate-900 truncate">
                {seminar.speaker.name}
              </h4>
              <p className="text-[11px] text-slate-500 truncate">
                {seminar.speaker.designation}
              </p>
            </div>
          </div>
        )}

        {/* Schedule & Venue Meta */}
        <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="font-semibold text-slate-800">{seminar.date}</span>
            <span className="text-slate-300">•</span>
            <Clock className="w-4 h-4 text-blue-600 shrink-0" />
            <span>{seminar.time}</span>
          </div>

          <div className="flex items-start gap-2">
            {seminar.mode === "Online" ? (
              <Video className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <MapPin className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
            )}
            <span className="line-clamp-1 text-slate-700">
              {seminar.venue || (seminar.meetingLink ? "Online Meeting Room" : "Meeting Link sent upon registration")}
            </span>
          </div>
        </div>

        {/* Seat Availability Progress Bar (if upcoming) */}
        {!isCompleted && (
          <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-slate-400" /> Seat Status
              </span>
              <span className="font-bold text-slate-800">
                {registeredCount} / {totalSeats} ({availableSeats} left)
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  percentFilled >= 90
                    ? "bg-rose-500"
                    : percentFilled >= 70
                    ? "bg-amber-500"
                    : "bg-blue-600"
                }`}
                style={{ width: `${percentFilled}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Card Actions */}
      <div className="px-5 sm:px-6 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onViewDetails(seminar.id)}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 transition"
        >
          Details & Notes <ChevronRight className="w-3.5 h-3.5" />
        </button>

        {isCompleted ? (
          seminar.recordingUrl ? (
            <a
              href={seminar.recordingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
            >
              <Video className="w-3.5 h-3.5 text-rose-400" /> Watch Recording
            </a>
          ) : (
            <span className="text-xs font-medium text-slate-400">Recording Processing</span>
          )
        ) : isRegistered ? (
          <button
            onClick={() => onViewDetails(seminar.id)}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1.5 transition"
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Pass Confirmed
          </button>
        ) : availableSeats <= 0 ? (
          <button
            disabled
            className="px-3.5 py-1.5 rounded-xl bg-slate-200 text-slate-500 text-xs font-semibold cursor-not-allowed"
          >
            Seats Full
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onRegisterClick(seminar)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-500/20 hover:scale-[1.02] transition"
          >
            <Sparkles className="w-3.5 h-3.5" /> Register Now
          </button>
        )}
      </div>
    </div>
  );
};
