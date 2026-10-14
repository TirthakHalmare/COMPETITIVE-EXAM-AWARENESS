import React, { useState } from "react";
import {
  GraduationCap,
  Calendar,
  BookOpen,
  CheckSquare,
  Bookmark,
  Bell,
  User,
  ShieldCheck,
  Menu,
  X,
  LogOut,
  ChevronDown,
  Sparkles
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNotifications } from "../../context/NotificationContext";
import { useData } from "../../context/DataContext";

export const Navbar = ({ currentPath, navigate }) => {
  const { currentUser, isAdmin, logout, switchDemoRole } = useAuth();
  const { unreadCount } = useNotifications();
  const { saved } = useData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const savedCount = (saved.exams?.length || 0) + (saved.seminars?.length || 0);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Dashboard", path: "/dashboard", authOnly: true },
    { label: "Competitive Exams", path: "/exams" },
    { label: "Seminars & Guidance", path: "/seminars" },
    { label: "Prep Strategies", path: "/strategies" },
    { label: "Study Planner", path: "/planner" },
  ];

  const handleNav = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div
            onClick={() => handleNav("/")}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="font-extrabold text-slate-900 text-lg tracking-tight block leading-tight">
                Exam<span className="text-blue-600">Awareness</span>
              </span>
              <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block">
                Guidance & Seminars
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? "text-blue-600 bg-blue-50/80"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}

            {isAdmin && (
              <button
                onClick={() => handleNav("/admin")}
                className={`px-3 py-2 rounded-lg text-sm font-bold flex items-center gap-1.5 transition-colors ${
                  currentPath === "/admin"
                    ? "bg-purple-100 text-purple-800"
                    : "text-purple-700 bg-purple-50 hover:bg-purple-100/80"
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-purple-600" />
                Admin Panel
              </button>
            )}
          </nav>

          {/* Right Action Icons & Auth Profile */}
          <div className="hidden md:flex items-center gap-2">
            {/* Quick Demo Switcher Pill */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs mr-1">
              <button
                onClick={() => switchDemoRole("student")}
                className={`px-2 py-1 rounded-md font-medium transition ${
                  !isAdmin ? "bg-white text-blue-700 shadow-sm" : "text-slate-500 hover:text-slate-900"
                }`}
                title="Switch to Student view"
              >
                Student
              </button>
              <button
                onClick={() => switchDemoRole("admin")}
                className={`px-2 py-1 rounded-md font-medium transition flex items-center gap-1 ${
                  isAdmin ? "bg-purple-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-900"
                }`}
                title="Switch to Admin view to test management controls"
              >
                <ShieldCheck className="w-3 h-3" />
                Admin
              </button>
            </div>

            {/* Bookmarks */}
            <button
              onClick={() => handleNav("/saved")}
              className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
              title="Saved Items"
            >
              <Bookmark className="w-5 h-5" />
              {savedCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Notifications */}
            <button
              onClick={() => handleNav("/notifications")}
              className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Profile Dropdown */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pl-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition"
                >
                  <img
                    src={currentUser.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80"}
                    alt={currentUser.displayName}
                    className="w-7 h-7 rounded-lg object-cover border border-slate-300"
                  />
                  <span className="text-xs font-bold text-slate-800 max-w-[100px] truncate">
                    {currentUser.displayName}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-semibold text-slate-900">{currentUser.displayName}</p>
                      <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                        {currentUser.role}
                      </span>
                    </div>

                    <button
                      onClick={() => handleNav("/dashboard")}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <BookOpen className="w-4 h-4 text-slate-400" />
                      Student Dashboard
                    </button>
                    <button
                      onClick={() => handleNav("/profile")}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      My Profile & Goals
                    </button>
                    {isAdmin && (
                      <button
                        onClick={() => handleNav("/admin")}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-purple-700 hover:bg-purple-50 flex items-center gap-2"
                      >
                        <ShieldCheck className="w-4 h-4 text-purple-500" />
                        Admin Dashboard
                      </button>
                    )}

                    <div className="border-t border-slate-100 my-1"></div>

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4 text-rose-500" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => handleNav("/auth")}
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition"
              >
                Login / Register
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => handleNav("/notifications")}
              className="p-2 text-slate-600 relative"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2">
          {/* Quick Demo Switcher on mobile */}
          <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg mb-3">
            <span className="text-xs font-semibold text-slate-600">Simulate Role:</span>
            <div className="flex gap-1">
              <button
                onClick={() => switchDemoRole("student")}
                className={`px-3 py-1 rounded text-xs font-semibold ${
                  !isAdmin ? "bg-blue-600 text-white" : "bg-white text-slate-700 border"
                }`}
              >
                Student
              </button>
              <button
                onClick={() => switchDemoRole("admin")}
                className={`px-3 py-1 rounded text-xs font-semibold ${
                  isAdmin ? "bg-purple-600 text-white" : "bg-white text-slate-700 border"
                }`}
              >
                Admin
              </button>
            </div>
          </div>

          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => handleNav(link.path)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition ${
                currentPath === link.path
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              {link.label}
            </button>
          ))}

          {isAdmin && (
            <button
              onClick={() => handleNav("/admin")}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold bg-purple-50 text-purple-700 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-purple-600" />
              Admin Dashboard
            </button>
          )}

          <div className="border-t border-slate-200 pt-3 flex flex-col gap-2">
            <button
              onClick={() => handleNav("/saved")}
              className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              <span className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-slate-500" /> Saved Items
              </span>
              {savedCount > 0 && (
                <span className="text-xs bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full">
                  {savedCount}
                </span>
              )}
            </button>
            <button
              onClick={() => handleNav("/profile")}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              <User className="w-4 h-4 text-slate-500" /> My Profile
            </button>
            <button
              onClick={() => handleNav("/auth")}
              className="w-full mt-2 py-2 text-center text-sm font-bold text-white bg-blue-600 rounded-lg shadow"
            >
              {currentUser ? "Switch Account" : "Login / Sign Up"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
