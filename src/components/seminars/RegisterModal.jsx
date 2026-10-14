import React, { useState } from "react";
import { Modal } from "../common/Modal";
import {
  Calendar,
  Clock,
  MapPin,
  Video,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Ticket
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import { useToast } from "../common/Toast";

export const RegisterModal = ({
  isOpen,
  onClose,
  seminar
}) => {
  const { currentUser } = useAuth();
  const { registerForSeminar } = useData();
  const { success, error: toastError } = useToast();

  const [formData, setFormData] = useState({
    name: currentUser?.displayName || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
    educationLevel: currentUser?.educationLevel || "Undergraduate (Final Year)",
    targetExam: currentUser?.targetExams?.[0] || "UPSC Civil Services",
  });

  const [submitting, setSubmitting] = useState(false);
  const [confirmedPass, setConfirmedPass] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  if (!seminar) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMessage("Please provide your full name and valid email address.");
      return;
    }

    setSubmitting(true);
    try {
      const reg = await registerForSeminar(seminar.id, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        educationLevel: formData.educationLevel,
        targetExam: formData.targetExam,
      });

      setConfirmedPass(reg);
      success("Registration successful! Your digital pass has been issued.");
    } catch (err) {
      setErrorMessage(err.message || "Failed to register. Please try again.");
      toastError(err.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setConfirmedPass(null);
    setErrorMessage("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleModalClose}
      title={confirmedPass ? "Registration Confirmed!" : "Seminar & Guidance Registration"}
      subtitle={confirmedPass ? "Save your pass details below" : "Free admission for college students & aspirants"}
      maxWidth="max-w-lg"
    >
      {confirmedPass ? (
        <div className="space-y-5 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <h4 className="text-lg font-extrabold text-slate-900">You're All Set!</h4>
            <p className="text-xs text-slate-500 mt-1">
              A confirmation email and session calendar invite has been sent to{" "}
              <span className="font-semibold text-slate-800">{confirmedPass.studentEmail}</span>
            </p>
          </div>

          {/* Ticket / Pass Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-5 text-left relative overflow-hidden shadow-sm">
            <div className="flex items-center justify-between border-b border-blue-200/80 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <Ticket className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                  Official Admission Pass
                </span>
              </div>
              <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-blue-200 text-blue-700 font-bold">
                {confirmedPass.id}
              </span>
            </div>

            <h5 className="font-bold text-slate-900 text-sm mb-1 leading-snug">
              {seminar.title}
            </h5>
            <p className="text-xs text-blue-700 font-medium mb-3">
              Speaker: {seminar.speaker?.name}
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-white/70 p-3 rounded-xl border border-blue-100">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Attendee</span>
                <span className="font-bold text-slate-800">{confirmedPass.studentName}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Target Exam</span>
                <span className="font-bold text-slate-800 truncate block">{confirmedPass.targetExam || "Civil Services"}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Date & Time</span>
                <span className="font-semibold text-slate-700">{seminar.date} • {seminar.time}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Mode</span>
                <span className="font-semibold text-blue-700">{seminar.mode}</span>
              </div>
            </div>

            <div className="mt-3 text-[11px] text-slate-500">
              {seminar.mode === "Online" ? (
                <span>Meeting link will be activated 15 minutes before the session starts.</span>
              ) : (
                <span>Venue: <strong className="text-slate-700">{seminar.venue}</strong>. Please carry a digital copy of this pass.</span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleModalClose}
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition"
          >
            Done
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Seminar Mini Preview */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1.5 text-xs">
            <h4 className="font-bold text-slate-900 text-sm">{seminar.title}</h4>
            <div className="flex flex-wrap items-center gap-3 text-slate-600 pt-1">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-blue-600" /> {seminar.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-blue-600" /> {seminar.time}
              </span>
              <span className="flex items-center gap-1 font-semibold text-purple-700">
                {seminar.mode === "Online" ? <Video className="w-3.5 h-3.5" /> : <MapPin className="w-3.5 h-3.5" />}
                {seminar.mode}
              </span>
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Aarav Sharma"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="student@example.com"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                WhatsApp / Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Current Education Level
              </label>
              <select
                value={formData.educationLevel}
                onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm bg-white"
              >
                <option value="12th Standard / Junior College">12th Standard / Junior College</option>
                <option value="Undergraduate (1st / 2nd Year)">Undergraduate (1st / 2nd Year)</option>
                <option value="Undergraduate (Final Year)">Undergraduate (Final Year)</option>
                <option value="Completed Graduation">Completed Graduation</option>
                <option value="Postgraduate / Master's">Postgraduate / Master's</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Primary Target Exam
              </label>
              <select
                value={formData.targetExam}
                onChange={(e) => setFormData({ ...formData, targetExam: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm bg-white"
              >
                <option value="UPSC Civil Services">UPSC Civil Services</option>
                <option value="SSC CGL / CHSL">SSC CGL / CHSL</option>
                <option value="Banking (IBPS / SBI PO)">Banking (IBPS / SBI PO)</option>
                <option value="Railways RRB NTPC">Railways RRB NTPC</option>
                <option value="GATE & PSUs">GATE & PSUs</option>
                <option value="Defence (CDS / NDA / AFCAT)">Defence (CDS / NDA / AFCAT)</option>
                <option value="State PSC (MPSC)">State PSC (MPSC)</option>
                <option value="NEET / JEE">NEET / JEE</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition disabled:opacity-70"
            >
              <Sparkles className="w-4 h-4" />
              {submitting ? "Confirming Registration..." : "Confirm Free Registration"}
            </button>
            <p className="text-[11px] text-center text-slate-400 mt-2">
              Instant digital pass generated upon submission. No registration fees.
            </p>
          </div>
        </form>
      )}
    </Modal>
  );
};
