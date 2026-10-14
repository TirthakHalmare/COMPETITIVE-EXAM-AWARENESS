import React, { useState, useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import { DataProvider } from "./context/DataContext";
import { ToastProvider } from "./components/common/Toast";
import { Navbar } from "./components/common/Navbar";
import { Footer } from "./components/common/Footer";
import { RegisterModal } from "./components/seminars/RegisterModal";

// Pages
import { HomePage } from "./pages/HomePage";
import { DashboardPage } from "./pages/DashboardPage";
import { ExamsPage } from "./pages/ExamsPage";
import { ExamDetailsPage } from "./pages/ExamDetailsPage";
import { SeminarsPage } from "./pages/SeminarsPage";
import { SeminarDetailsPage } from "./pages/SeminarDetailsPage";
import { StrategiesPage } from "./pages/StrategiesPage";
import { PlannerPage } from "./pages/PlannerPage";
import { SavedPage } from "./pages/SavedPage";
import { NotificationsPage } from "./pages/NotificationsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { AuthPage } from "./pages/AuthPage";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";

export function AppContent() {
  const [currentPath, setCurrentPath] = useState(() => {
    return window.location.pathname || "/";
  });

  const [registeringSeminar, setRegisteringSeminar] = useState(null);

  // Sync browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || "/");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Custom router navigate helper
  const navigate = (path) => {
    if (path !== currentPath) {
      window.history.pushState({}, "", path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Route parser
  const renderCurrentPage = () => {
    // Dynamic /exams/:id route
    if (currentPath.startsWith("/exams/") && currentPath.length > 7) {
      const examId = currentPath.replace("/exams/", "");
      return (
        <ExamDetailsPage
          examId={examId}
          navigate={navigate}
          onRegisterSeminar={(seminar) => setRegisteringSeminar(seminar)}
        />
      );
    }

    // Dynamic /seminars/:id route
    if (currentPath.startsWith("/seminars/") && currentPath.length > 10) {
      const seminarId = currentPath.replace("/seminars/", "");
      return (
        <SeminarDetailsPage
          seminarId={seminarId}
          navigate={navigate}
          onRegisterClick={(seminar) => setRegisteringSeminar(seminar)}
        />
      );
    }

    switch (currentPath) {
      case "/dashboard":
        return <DashboardPage navigate={navigate} />;
      case "/exams":
        return <ExamsPage navigate={navigate} />;
      case "/seminars":
        return (
          <SeminarsPage
            navigate={navigate}
            onRegisterClick={(seminar) => setRegisteringSeminar(seminar)}
          />
        );
      case "/strategies":
        return <StrategiesPage navigate={navigate} />;
      case "/planner":
        return <PlannerPage navigate={navigate} />;
      case "/saved":
        return (
          <SavedPage
            navigate={navigate}
            onRegisterSeminar={(seminar) => setRegisteringSeminar(seminar)}
          />
        );
      case "/notifications":
        return <NotificationsPage navigate={navigate} />;
      case "/profile":
        return <ProfilePage navigate={navigate} />;
      case "/auth":
        return <AuthPage navigate={navigate} />;
      case "/admin":
        return <AdminDashboardPage navigate={navigate} />;
      case "/":
      default:
        return (
          <HomePage
            navigate={navigate}
            onRegisterSeminar={(seminar) => setRegisteringSeminar(seminar)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-blue-600 selection:text-white">
      <Navbar currentPath={currentPath} navigate={navigate} />

      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      <Footer navigate={navigate} />

      {/* Global Seminar Registration Modal */}
      <RegisterModal
        isOpen={Boolean(registeringSeminar)}
        onClose={() => setRegisteringSeminar(null)}
        seminar={registeringSeminar}
      />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <NotificationProvider>
          <DataProvider>
            <AppContent />
          </DataProvider>
        </NotificationProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
