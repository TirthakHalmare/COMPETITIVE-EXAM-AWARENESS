import React, { useState } from "react";
import {
  GraduationCap,
  Mail,
  Lock,
  User,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  AlertCircle
} from "lucide-react";
import { Badge } from "../components/common/Badge";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../common/Toast";

export const AuthPage = ({ navigate }) => {
  const { login, signup, switchDemoRole, isFirebase } = useAuth();
  const { success, error: toastError } = useToast();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [educationLevel, setEducationLevel] = useState("Undergraduate (Final Year)");
  const [targetExam, setTargetExam] = useState("UPSC Civil Services");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
        success("Logged in successfully! Welcome back.");
      } else {
        await signup(email, password, {
          displayName,
          educationLevel,
          targetExams: [targetExam],
          dailyGoalHours: 4,
        });
        success("Account created successfully! Welcome to Exam Awareness.");
      }
      navigate("/dashboard");
    } catch (err) {
      setErrorMessage(err.message || "Authentication failed. Please verify credentials.");
      toastError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = (role) => {
    switchDemoRole(role);
    success(`Switched to Demo ${role === "admin" ? "Administrator" : "Student"} account!`);
    navigate(role === "admin" ? "/admin" : "/dashboard");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        
        {/* Logo and Heading */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white mx-auto shadow-md shadow-blue-500/20">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {isLogin ? "Welcome Back Aspirant" : "Join Exam Awareness"}
          </h2>
          <p className="text-xs text-slate-500">
            {isLogin
              ? "Sign in to access your registered guidance sessions & study planner"
              : "Create your free student profile to book seats and track target exams"}
          </p>
        </div>

        {/* Quick 1-Click Demo Login Panel */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-4 text-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="font-bold text-blue-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-600" /> Instant Demo Evaluation
            </span>
            <span className="text-[10px] uppercase font-bold text-blue-700 bg-white px-2 py-0.5 rounded border border-blue-200">
              {isFirebase ? "Firebase Active" : "Demo Mode"}
            </span>
          </div>

          <p className="text-slate-600 text-[11px] leading-relaxed">
            Evaluate all student & administrator capabilities in 1 click without entering credentials:
          </p>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={() => handleQuickDemo("student")}
              className="py-2 px-3 rounded-xl bg-white hover:bg-blue-100/50 text-blue-700 border border-blue-200 font-bold text-xs shadow-xs transition"
            >
              Demo Student
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo("admin")}
              className="py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" /> Demo Admin
            </button>
          </div>
        </div>

        {/* Main Auth Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-5">
          
          {/* Tab Switcher */}
          <div className="flex p-1 bg-slate-100 rounded-xl">
            <button
              type="button"
              onClick={() => {
                setIsLogin(true);
                setErrorMessage("");
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                isLogin ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setIsLogin(false);
                setErrorMessage("");
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                !isLogin ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
              }`}
            >
              New Registration
            </button>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Aarav Sharma"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            {!isLogin && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Education
                  </label>
                  <select
                    value={educationLevel}
                    onChange={(e) => setEducationLevel(e.target.value)}
                    className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="Undergraduate (Final Year)">Undergrad Final Year</option>
                    <option value="Undergraduate (1st/2nd)">1st/2nd Year</option>
                    <option value="Completed Graduation">Graduate</option>
                    <option value="12th Pass">12th Pass</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Primary Exam
                  </label>
                  <select
                    value={targetExam}
                    onChange={(e) => setTargetExam(e.target.value)}
                    className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="UPSC Civil Services">UPSC CSE</option>
                    <option value="SSC CGL">SSC CGL</option>
                    <option value="Banking (IBPS/SBI)">Banking PO</option>
                    <option value="Railways RRB">Railways</option>
                    <option value="GATE">GATE</option>
                    <option value="Defence (CDS/NDA)">Defence</option>
                  </select>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition disabled:opacity-70"
            >
              {loading ? "Processing..." : isLogin ? "Sign In to Account" : "Create Free Account"}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
