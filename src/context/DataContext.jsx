import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  getExams,
  saveExam,
  deleteExam,
  getSeminars,
  saveSeminar,
  deleteSeminar,
  registerForSeminar,
  getRegistrations,
  getStudyTasks,
  saveStudyTask,
  deleteStudyTask,
  getSavedItems,
  toggleSavedItem,
  getAnnouncements,
  addAnnouncement,
  seedSampleDataToFirestore
} from "../services/db";
import { useAuth } from "./AuthContext";
import { useNotifications } from "./NotificationContext";

const DataContext = createContext(null);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const { currentUser, isAdmin } = useAuth();
  const { addNotification } = useNotifications();

  const [exams, setExams] = useState([]);
  const [seminars, setSeminars] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [saved, setSaved] = useState({ exams: [], seminars: [] });
  const [studyTasks, setStudyTasks] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load all data
  const loadAllData = useCallback(async () => {
    setLoading(true);
    try {
      const userId = currentUser?.uid || "guest";
      const [
        fetchedExams,
        fetchedSeminars,
        fetchedRegs,
        fetchedSaved,
        fetchedTasks,
        fetchedAnnouncements
      ] = await Promise.all([
        getExams(),
        getSeminars(),
        getRegistrations(isAdmin ? null : userId),
        getSavedItems(userId),
        getStudyTasks(userId),
        getAnnouncements()
      ]);

      setExams(fetchedExams || []);
      setSeminars(fetchedSeminars || []);
      setRegistrations(fetchedRegs || []);
      setSaved(fetchedSaved || { exams: [], seminars: [] });
      setStudyTasks(fetchedTasks || []);
      setAnnouncements(fetchedAnnouncements || []);
    } catch (e) {
      console.error("Error loading application data:", e);
    } finally {
      setLoading(false);
    }
  }, [currentUser, isAdmin]);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  // SEMINAR REGISTRATION
  const handleRegisterForSeminar = async (seminarId, details = {}) => {
    const userId = currentUser?.uid || "guest-user";
    const studentName = details.name || currentUser?.displayName || "Student Aspirant";
    const studentEmail = details.email || currentUser?.email || "student@example.com";

    const regData = {
      seminarId,
      userId,
      studentName,
      studentEmail,
      studentPhone: details.phone || currentUser?.phone || "",
      educationLevel: details.educationLevel || currentUser?.educationLevel || "",
      targetExam: details.targetExam || ""
    };

    const newReg = await registerForSeminar(regData);

    // Refresh state
    const sem = seminars.find(s => s.id === seminarId);
    setSeminars(prev =>
      prev.map(s => {
        if (s.id === seminarId) {
          const newRegistered = (s.registeredCount || 0) + 1;
          return {
            ...s,
            registeredCount: newRegistered,
            availableSeats: Math.max(0, (s.totalSeats || 100) - newRegistered)
          };
        }
        return s;
      })
    );

    setRegistrations(prev => [newReg, ...prev]);

    // Send in-app notification
    addNotification({
      title: "Registration Confirmed! 🎉",
      message: `You are registered for '${sem ? sem.title : "Guidance Seminar"}'. Check your seminar pass.`,
      category: "seminar",
      actionLink: `/seminars/${seminarId}`
    });

    return newReg;
  };

  // CHECK IF USER IS REGISTERED FOR A SEMINAR
  const isRegisteredForSeminar = (seminarId) => {
    const userId = currentUser?.uid;
    const userEmail = currentUser?.email;
    return registrations.some(
      r => r.seminarId === seminarId && (r.userId === userId || r.studentEmail === userEmail)
    );
  };

  // BOOKMARKS / SAVED ITEMS
  const isBookmarked = (type, itemId) => {
    return Boolean(saved[type]?.includes(itemId));
  };

  const handleToggleBookmark = async (type, itemId) => {
    const userId = currentUser?.uid || "guest";
    const res = await toggleSavedItem(type, itemId, userId);
    setSaved(res.data);
    return res.saved;
  };

  // STUDY TASKS / PLANNER
  const handleSaveTask = async (taskData) => {
    const userId = currentUser?.uid || "guest";
    const savedTask = await saveStudyTask(taskData, userId);
    setStudyTasks(prev => {
      const idx = prev.findIndex(t => t.id === savedTask.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = savedTask;
        return copy;
      }
      return [savedTask, ...prev];
    });
    return savedTask;
  };

  const handleDeleteTask = async (taskId) => {
    const userId = currentUser?.uid || "guest";
    await deleteStudyTask(taskId, userId);
    setStudyTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const handleToggleTaskComplete = async (taskId) => {
    const task = studyTasks.find(t => t.id === taskId);
    if (!task) return;
    const updated = {
      ...task,
      completed: !task.completed,
      completedAt: !task.completed ? new Date().toISOString() : null
    };
    await handleSaveTask(updated);
  };

  // ADMIN OPERATIONS
  const handleSaveExam = async (examData) => {
    const record = await saveExam(examData);
    setExams(prev => {
      const idx = prev.findIndex(e => e.id === record.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = record;
        return copy;
      }
      return [record, ...prev];
    });
    return record;
  };

  const handleDeleteExam = async (examId) => {
    await deleteExam(examId);
    setExams(prev => prev.filter(e => e.id !== examId));
  };

  const handleSaveSeminar = async (seminarData) => {
    const record = await saveSeminar(seminarData);
    setSeminars(prev => {
      const idx = prev.findIndex(s => s.id === record.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = record;
        return copy;
      }
      return [record, ...prev];
    });
    return record;
  };

  const handleDeleteSeminar = async (seminarId) => {
    await deleteSeminar(seminarId);
    setSeminars(prev => prev.filter(s => s.id !== seminarId));
  };

  const handleAddAnnouncement = async (announcementData) => {
    const record = await addAnnouncement(announcementData);
    setAnnouncements(prev => [record, ...prev]);

    // Send broadcast notification
    addNotification({
      title: `Announcement: ${record.title}`,
      message: record.content,
      category: record.type || "system",
      actionLink: record.link || "/"
    });

    return record;
  };

  const handleSeedDatabase = async () => {
    const res = await seedSampleDataToFirestore();
    await loadAllData();
    return res;
  };

  const value = {
    exams,
    seminars,
    registrations,
    saved,
    studyTasks,
    announcements,
    loading,
    refreshData: loadAllData,
    registerForSeminar: handleRegisterForSeminar,
    isRegisteredForSeminar,
    toggleBookmark: handleToggleBookmark,
    isBookmarked,
    saveTask: handleSaveTask,
    deleteTask: handleDeleteTask,
    toggleTaskComplete: handleToggleTaskComplete,
    saveExam: handleSaveExam,
    deleteExam: handleDeleteExam,
    saveSeminar: handleSaveSeminar,
    deleteSeminar: handleDeleteSeminar,
    addAnnouncement: handleAddAnnouncement,
    seedDatabase: handleSeedDatabase
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
