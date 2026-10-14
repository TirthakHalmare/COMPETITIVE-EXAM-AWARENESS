import React from "react";
import { GraduationCap, ExternalLink, Mail, Phone, ShieldCheck, Heart } from "lucide-react";

export const Footer = ({ navigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => navigate("/")}
              className="flex items-center gap-3 cursor-pointer inline-flex"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="font-extrabold text-white text-lg tracking-tight">
                  Competitive Exam <span className="text-blue-400">Awareness</span>
                </span>
                <span className="text-[11px] block text-slate-400 font-medium">
                  Student Guidance & Seminar Platform
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Empowering college students and youth across India with structured awareness, official syllabus breakdowns, expert-led guidance seminars, and daily study planning for central & state examinations.
            </p>

            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-blue-400" /> guidance@examawareness.org
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-emerald-400" /> Helpline: 1800-123-STUDY
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => navigate("/exams")}
                  className="hover:text-blue-400 transition"
                >
                  Competitive Exams Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/seminars")}
                  className="hover:text-blue-400 transition"
                >
                  Seminars & Webinars
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/strategies")}
                  className="hover:text-blue-400 transition"
                >
                  Preparation Blueprints
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/planner")}
                  className="hover:text-blue-400 transition"
                >
                  Daily Study Planner
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="hover:text-blue-400 transition"
                >
                  Student Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Official Commission Portals */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Official Portals
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a
                  href="https://upsc.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1 transition"
                >
                  UPSC Portal <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://ssc.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1 transition"
                >
                  SSC Commission <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://ibps.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1 transition"
                >
                  IBPS Banking <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://indianrailways.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1 transition"
                >
                  Indian Railways RRB <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://mpsc.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1 transition"
                >
                  State PSC (MPSC) <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Verification & Compliance */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Notice & Trust
            </h4>
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs text-slate-400 leading-relaxed">
              <span className="flex items-center gap-1.5 text-amber-400 font-semibold mb-1">
                <ShieldCheck className="w-4 h-4" /> Official Notice Policy
              </span>
              All unverified or tentative dates are clearly designated. We never publish fabricated deadlines or charge unauthorized application fees.
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Competitive Exam Awareness Initiative. Dedicated to Student Guidance.</p>
          <div className="flex items-center gap-1">
            <span>Designed for Aspirants with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>across India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
