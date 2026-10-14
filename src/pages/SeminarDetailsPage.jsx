import React from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Video,
  Users,
  CheckCircle2,
  Download,
  Share2,
  Sparkles,
  Ticket,
  FileText,
  PlayCircle
} from "lucide-react";
import { Badge } from "../components/common/Badge";
import { useData } from "../context/DataContext";
import { useToast } from "../common/Toast";

export const SeminarDetailsPage = ({
  seminarId,
  navigate,
  onRegisterClick
}) => {
  const { seminars, isRegisteredForSeminar, registrations } = useData();
  const { success } = useToast();

  const seminar = seminars.find((s) => s.id === seminarId) || seminars[0];
  const isRegistered = isRegisteredForSeminar(seminar?.id);
  const myRegistration = registrations.find((r) => r.seminarId === seminar?.id);

  if (!seminar) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Seminar not found</h2>
        <button
          onClick={() => navigate("/seminars")}
          className="text-sm font-semibold text-blue-600 hover:underline"
        >
          ← Return to Seminars List
        </button>
      </div>
    );
  }

  const isCompleted = seminar.status === "completed";
  const totalSeats = seminar.totalSeats || 100;
  const registeredCount = seminar.registeredCount || 0;
  const availableSeats = seminar.availableSeats !== undefined ? seminar.availableSeats : Math.max(0, totalSeats - registeredCount);
  const percentFilled = Math.min(100, Math.round((registeredCount / totalSeats) * 100));

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: seminar.title,
        text: `Check out this guidance seminar on ${seminar.topic}!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      success("Seminar link copied to clipboard!");
    }
  };

  const generateGoogleCalendarUrl = () => {
    const title = encodeURIComponent(seminar.title);
    const details = encodeURIComponent(`${seminar.topic}\nSpeaker: ${seminar.speaker?.name}`);
    const location = encodeURIComponent(seminar.venue || seminar.meetingLink || "Online");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back button */}
      <button
        onClick={() => navigate("/seminars")}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Seminars & Sessions
      </button>

      {/* HEADER CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant={seminar.mode === "Online" ? "primary" : "purple"}
                size="md"
                icon={seminar.mode === "Online" ? Video : MapPin}
              >
                {seminar.mode} Session
              </Badge>
              <Badge variant="default" size="md">
                {seminar.category}
              </Badge>
              {isCompleted ? (
                <Badge variant="default" size="md">
                  Completed
                </Badge>
              ) : isRegistered ? (
                <Badge variant="success" size="md" icon={CheckCircle2}>
                  Registered (Pass Confirmed)
                </Badge>
              ) : (
                <Badge variant="success" size="md">
                  Open for Registration
                </Badge>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {seminar.title}
            </h1>
            <p className="text-sm font-bold text-blue-700">
              Theme: {seminar.topic}
            </p>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={handleShare}
              className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold flex items-center justify-center gap-1.5 transition"
            >
              <Share2 className="w-4 h-4" /> Share
            </button>

            {!isCompleted && !isRegistered && availableSeats > 0 && (
              <button
                onClick={() => onRegisterClick(seminar)}
                className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 hover:scale-105 transition"
              >
                <Sparkles className="w-4 h-4" /> Register Free
              </button>
            )}
          </div>
        </div>

        {/* Date, Time & Mode Meta Box */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs text-slate-700">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-blue-600" />
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Date</span>
              <span className="font-bold text-slate-900">{seminar.date}</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-blue-600" />
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Time Slot</span>
              <span className="font-bold text-slate-900">{seminar.time}</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            {seminar.mode === "Online" ? (
              <Video className="w-4 h-4 text-emerald-600" />
            ) : (
              <MapPin className="w-4 h-4 text-purple-600" />
            )}
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Location</span>
              <span className="font-bold text-slate-900 truncate block">
                {seminar.venue || (seminar.meetingLink ? "Online Meeting Room" : "Google Meet")}
              </span>
            </div>
          </div>
        </div>

        {/* If user is registered: Digital Pass View */}
        {isRegistered && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                <Ticket className="w-4 h-4 text-emerald-600" /> Digital Admission Pass Issued
              </span>
              <span className="text-[11px] font-mono font-bold bg-white px-2.5 py-0.5 rounded border border-emerald-300 text-emerald-800">
                {myRegistration?.id || "PASS-VERIFIED"}
              </span>
            </div>

            <p className="text-xs text-emerald-900 leading-relaxed">
              Your registration has been confirmed! Please show this digital pass or mention your name upon entry at the auditorium, or join via the meeting URL on the scheduled date.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={generateGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-white text-emerald-800 border border-emerald-300 rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-emerald-100/50 transition"
              >
                <Calendar className="w-3.5 h-3.5 text-emerald-600" /> Add to Google Calendar
              </a>

              {seminar.meetingLink && (
                <a
                  href={seminar.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-emerald-700 transition"
                >
                  <Video className="w-3.5 h-3.5" /> Join Meeting Link
                </a>
              )}
            </div>
          </div>
        )}

        {/* If completed: Recording Video Embed */}
        {isCompleted && (
          <div className="space-y-3 border-t border-slate-100 pt-6">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-rose-600" /> Session Video Recording
            </h3>
            {seminar.recordingUrl ? (
              <div className="bg-slate-900 rounded-2xl p-6 text-center text-white space-y-3">
                <p className="text-xs text-slate-300">
                  This guidance session was completed and recorded for student reference.
                </p>
                <a
                  href={seminar.recordingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-lg transition"
                >
                  <PlayCircle className="w-4 h-4" /> Watch Full Masterclass Recording
                </a>
              </div>
            ) : (
              <p className="text-xs text-slate-500">Video recording is being edited and will be published shortly.</p>
            )}
          </div>
        )}
      </div>

      {/* 2-COLUMN LAYOUT: Description & Speaker */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Agenda & Description */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Session Overview & Agenda</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {seminar.description}
            </p>

            <div className="border-t border-slate-100 pt-4 space-y-2">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Target Audience & Eligibility
              </h4>
              <p className="text-xs text-slate-600">
                {seminar.targetAudience || "Undergraduate college students, recent graduates, and competitive exam aspirants."}
              </p>
            </div>
          </div>

          {/* Handouts & Materials */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" /> Provided Study Resources & Handouts
            </h3>
            <p className="text-xs text-slate-500">
              Registered participants receive free access to the following curated preparation guides:
            </p>

            <div className="space-y-2 pt-1">
              {seminar.materialsProvided?.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-800"
                >
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {item}
                  </span>
                  <span className="text-[11px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded">
                    Included Free
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Col: Speaker Profile & Seat Status */}
        <div className="space-y-6">
          
          {/* Speaker Card */}
          {seminar.speaker && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm text-center space-y-4">
              <img
                src={seminar.speaker.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
                alt={seminar.speaker.name}
                className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-blue-50 shadow-md"
              />

              <div>
                <h4 className="font-bold text-slate-900 text-base">{seminar.speaker.name}</h4>
                <p className="text-xs text-blue-600 font-semibold mt-0.5">{seminar.speaker.designation}</p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed text-left bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                {seminar.speaker.bio}
              </p>
            </div>
          )}

          {/* Seat Status & Action (if upcoming) */}
          {!isCompleted && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-slate-500" /> Available Capacity
                </span>
                <span className="font-extrabold text-slate-900">
                  {registeredCount} / {totalSeats}
                </span>
              </div>

              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${percentFilled}%` }}
                />
              </div>

              <p className="text-xs text-slate-500 text-center">
                {availableSeats > 0 ? (
                  <span>Only <strong className="text-slate-800">{availableSeats} seats</strong> remaining</span>
                ) : (
                  <span className="text-rose-600 font-bold">All seats have been reserved</span>
                )}
              </p>

              {!isRegistered && availableSeats > 0 && (
                <button
                  onClick={() => onRegisterClick(seminar)}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-500/20 transition hover:scale-105"
                >
                  Register Free for this Seminar
                </button>
              )}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
