import React, { useState, useEffect } from "react";
import { Modal } from "../common/Modal";
import { Save } from "lucide-react";

export const AdminSeminarModal = ({
  isOpen,
  onClose,
  onSave,
  seminarToEdit
}) => {
  const [formData, setFormData] = useState({
    title: "",
    topic: "",
    description: "",
    mode: "Online",
    speakerName: "",
    speakerDesignation: "",
    speakerBio: "",
    date: new Date().toISOString().split("T")[0],
    time: "10:30 AM - 1:00 PM IST",
    venue: "",
    meetingLink: "",
    category: "Civil Services",
    totalSeats: 250,
    status: "upcoming",
    recordingUrl: "",
  });

  useEffect(() => {
    if (seminarToEdit) {
      setFormData({
        title: seminarToEdit.title || "",
        topic: seminarToEdit.topic || "",
        description: seminarToEdit.description || "",
        mode: seminarToEdit.mode || "Online",
        speakerName: seminarToEdit.speaker?.name || "",
        speakerDesignation: seminarToEdit.speaker?.designation || "",
        speakerBio: seminarToEdit.speaker?.bio || "",
        date: seminarToEdit.date || new Date().toISOString().split("T")[0],
        time: seminarToEdit.time || "10:30 AM - 1:00 PM IST",
        venue: seminarToEdit.venue || "",
        meetingLink: seminarToEdit.meetingLink || "",
        category: seminarToEdit.category || "Civil Services",
        totalSeats: seminarToEdit.totalSeats || 250,
        status: seminarToEdit.status || "upcoming",
        recordingUrl: seminarToEdit.recordingUrl || "",
      });
    } else {
      setFormData({
        title: "",
        topic: "",
        description: "",
        mode: "Online",
        speakerName: "",
        speakerDesignation: "",
        speakerBio: "",
        date: new Date().toISOString().split("T")[0],
        time: "10:30 AM - 1:00 PM IST",
        venue: "",
        meetingLink: "",
        category: "Civil Services",
        totalSeats: 250,
        status: "upcoming",
        recordingUrl: "",
      });
    }
  }, [seminarToEdit, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const payload = {
      id: seminarToEdit ? seminarToEdit.id : `sem-${Date.now()}`,
      title: formData.title,
      topic: formData.topic,
      description: formData.description,
      mode: formData.mode,
      speaker: {
        name: formData.speakerName || "Special Guest Mentor",
        designation: formData.speakerDesignation || "Civil Services / Subject Expert",
        bio: formData.speakerBio || "Experienced guide in competitive exam preparation.",
        avatar: seminarToEdit?.speaker?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      },
      date: formData.date,
      time: formData.time,
      venue: formData.mode !== "Online" ? formData.venue || "College Main Hall" : null,
      meetingLink: formData.mode !== "Offline" ? formData.meetingLink || "https://meet.google.com/sample" : null,
      category: formData.category,
      totalSeats: Number(formData.totalSeats),
      registeredCount: seminarToEdit ? seminarToEdit.registeredCount : 0,
      status: formData.status,
      recordingUrl: formData.status === "completed" ? formData.recordingUrl : null,
      materialsProvided: seminarToEdit?.materialsProvided || [
        "Syllabus Trend Sheet",
        "Recommended Booklist PDF",
        "Mock Test Schedule"
      ]
    };

    onSave(payload);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={seminarToEdit ? "Edit Guidance Session" : "Create New Seminar / Guidance Session"}
      subtitle="Publish offline seminars or online webinars for students"
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Session Title *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Masterclass: How to Prepare for UPSC Prelims 2026"
            className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Core Topic / Theme
            </label>
            <input
              type="text"
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              placeholder="e.g. Speed Calculation Techniques & Mock Strategy"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm bg-white"
            >
              <option value="Civil Services">Civil Services (UPSC & PSC)</option>
              <option value="Banking & SSC">Banking & SSC</option>
              <option value="General Strategy">General Strategy & Time Management</option>
              <option value="Defence">Defence Services (CDS / NDA)</option>
              <option value="Career Guidance">Career Guidance & Govt Jobs</option>
              <option value="Engineering & GATE">Engineering & GATE</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Description
          </label>
          <textarea
            rows={2}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Summary of learning outcomes, session agenda, and takeaways..."
            className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
          />
        </div>

        {/* Speaker Profile Section */}
        <div className="border-t border-slate-200 pt-3 space-y-3">
          <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider">
            Speaker Information
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Speaker Name *</label>
              <input
                type="text"
                required
                value={formData.speakerName}
                onChange={(e) => setFormData({ ...formData, speakerName: e.target.value })}
                placeholder="e.g. Dr. Arvind Sharma, IAS (Retd.)"
                className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Designation / Rank</label>
              <input
                type="text"
                value={formData.speakerDesignation}
                onChange={(e) => setFormData({ ...formData, speakerDesignation: e.target.value })}
                placeholder="e.g. Former Principal Secretary"
                className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Mode, Schedule & Logistics */}
        <div className="border-t border-slate-200 pt-3 space-y-3">
          <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider">
            Logistics & Schedule
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Delivery Mode</label>
              <select
                value={formData.mode}
                onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white"
              >
                <option value="Online">Online Webinar</option>
                <option value="Offline">Offline Seminar</option>
                <option value="Hybrid">Hybrid (Both)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Time Slot</label>
              <input
                type="text"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                placeholder="10:30 AM - 1:00 PM IST"
                className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Venue Location (if offline / hybrid)
              </label>
              <input
                type="text"
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                placeholder="Auditorium Hall, Central University Campus"
                className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Meeting Link (if online / hybrid)
              </label>
              <input
                type="url"
                value={formData.meetingLink}
                onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
                placeholder="https://meet.google.com/xyz-abc"
                className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Total Seat Capacity</label>
              <input
                type="number"
                min={10}
                max={5000}
                value={formData.totalSeats}
                onChange={(e) => setFormData({ ...formData, totalSeats: e.target.value })}
                className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white"
              >
                <option value="upcoming">Upcoming Session</option>
                <option value="completed">Completed (With Recording)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Recording Video URL</label>
              <input
                type="url"
                value={formData.recordingUrl}
                onChange={(e) => setFormData({ ...formData, recordingUrl: e.target.value })}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs"
              />
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            {seminarToEdit ? "Update Session" : "Create Session"}
          </button>
        </div>
      </form>
    </Modal>
  );
};
