import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  runTransaction,
  serverTimestamp
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import {
  INITIAL_EXAMS,
  INITIAL_SEMINARS,
  INITIAL_TASKS,
  INITIAL_ANNOUNCEMENTS
} from "../data/sampleData";

const STORAGE_KEYS = {
  EXAMS: "cea_exams",
  SEMINARS: "cea_seminars",
  TASKS: "cea_tasks",
  REGISTRATIONS: "cea_registrations",
  SAVED: "cea_saved",
  ANNOUNCEMENTS: "cea_announcements",
};

// Helper to initialize local storage data if empty
const getLocalData = (key, initial) => {
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(item);
  } catch (e) {
    return initial;
  }
};

const setLocalData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error("Error setting local storage key", key, e);
  }
};

// ==========================================
// COMPETITIVE EXAMS API
// ==========================================

export const getExams = async () => {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, "exams"));
      if (!snap.empty) {
        return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      }
    } catch (e) {
      console.warn("Firestore getExams failed, using local storage fallback:", e.message);
    }
  }
  return getLocalData(STORAGE_KEYS.EXAMS, INITIAL_EXAMS);
};

export const saveExam = async (examData) => {
  const isUpdate = Boolean(examData.id);
  const examId = isUpdate ? examData.id : `exam-${Date.now()}`;
  const record = { ...examData, id: examId, updatedAt: new Date().toISOString() };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, "exams", examId), record, { merge: true });
    } catch (e) {
      console.warn("Firestore saveExam failed, saving locally:", e.message);
    }
  }

  // Update local storage
  const current = getLocalData(STORAGE_KEYS.EXAMS, INITIAL_EXAMS);
  const exists = current.findIndex(item => item.id === examId);
  let updated;
  if (exists >= 0) {
    updated = [...current];
    updated[exists] = record;
  } else {
    updated = [record, ...current];
  }
  setLocalData(STORAGE_KEYS.EXAMS, updated);
  return record;
};

export const deleteExam = async (examId) => {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, "exams", examId));
    } catch (e) {
      console.warn("Firestore deleteExam failed:", e.message);
    }
  }
  const current = getLocalData(STORAGE_KEYS.EXAMS, INITIAL_EXAMS);
  const filtered = current.filter(item => item.id !== examId);
  setLocalData(STORAGE_KEYS.EXAMS, filtered);
  return true;
};

// ==========================================
// SEMINARS & GUIDANCE SESSIONS API
// ==========================================

export const getSeminars = async () => {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, "seminars"));
      if (!snap.empty) {
        return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      }
    } catch (e) {
      console.warn("Firestore getSeminars failed, using local fallback:", e.message);
    }
  }
  return getLocalData(STORAGE_KEYS.SEMINARS, INITIAL_SEMINARS);
};

export const saveSeminar = async (seminarData) => {
  const isUpdate = Boolean(seminarData.id);
  const seminarId = isUpdate ? seminarData.id : `sem-${Date.now()}`;
  const record = {
    ...seminarData,
    id: seminarId,
    totalSeats: Number(seminarData.totalSeats || 100),
    registeredCount: Number(seminarData.registeredCount || 0),
    availableSeats: Math.max(0, Number(seminarData.totalSeats || 100) - Number(seminarData.registeredCount || 0)),
    updatedAt: new Date().toISOString()
  };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, "seminars", seminarId), record, { merge: true });
    } catch (e) {
      console.warn("Firestore saveSeminar failed, using local storage:", e.message);
    }
  }

  const current = getLocalData(STORAGE_KEYS.SEMINARS, INITIAL_SEMINARS);
  const exists = current.findIndex(item => item.id === seminarId);
  let updated;
  if (exists >= 0) {
    updated = [...current];
    updated[exists] = record;
  } else {
    updated = [record, ...current];
  }
  setLocalData(STORAGE_KEYS.SEMINARS, updated);
  return record;
};

export const deleteSeminar = async (seminarId) => {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, "seminars", seminarId));
    } catch (e) {
      console.warn("Firestore deleteSeminar failed:", e.message);
    }
  }
  const current = getLocalData(STORAGE_KEYS.SEMINARS, INITIAL_SEMINARS);
  const filtered = current.filter(item => item.id !== seminarId);
  setLocalData(STORAGE_KEYS.SEMINARS, filtered);
  return true;
};

// ==========================================
// REGISTRATION FLOW (with duplicate check & seat reduction)
// ==========================================

export const registerForSeminar = async (registrationDetails) => {
  const { seminarId, userId, studentName, studentEmail, studentPhone, educationLevel, targetExam } = registrationDetails;

  const regId = `reg-${userId}-${seminarId}`;

  // Check local registrations first
  const currentRegs = getLocalData(STORAGE_KEYS.REGISTRATIONS, []);
  const alreadyRegistered = currentRegs.find(
    r => r.seminarId === seminarId && (r.userId === userId || r.studentEmail === studentEmail)
  );

  if (alreadyRegistered) {
    throw new Error("You have already registered for this session!");
  }

  const newReg = {
    id: regId,
    seminarId,
    userId,
    studentName,
    studentEmail,
    studentPhone: studentPhone || "",
    educationLevel: educationLevel || "",
    targetExam: targetExam || "",
    status: "Confirmed",
    registrationDate: new Date().toISOString()
  };

  // Firestore transaction if available
  if (isFirebaseConfigured && db) {
    try {
      const seminarRef = doc(db, "seminars", seminarId);
      const regRef = doc(db, "registrations", regId);

      await runTransaction(db, async (transaction) => {
        const semDoc = await transaction.get(seminarRef);
        if (!semDoc.exists()) {
          throw new Error("Seminar does not exist!");
        }
        const semData = semDoc.data();
        if (semData.availableSeats <= 0) {
          throw new Error("Sorry, all seats for this session are currently booked!");
        }

        const newRegisteredCount = (semData.registeredCount || 0) + 1;
        const newAvailableSeats = Math.max(0, (semData.totalSeats || 100) - newRegisteredCount);

        transaction.update(seminarRef, {
          registeredCount: newRegisteredCount,
          availableSeats: newAvailableSeats
        });

        transaction.set(regRef, newReg);
      });
    } catch (e) {
      console.warn("Firestore registration transaction fallback:", e.message);
    }
  }

  // Update local seminars list to decrement available seats
  const seminars = getLocalData(STORAGE_KEYS.SEMINARS, INITIAL_SEMINARS);
  const semIndex = seminars.findIndex(s => s.id === seminarId);
  if (semIndex >= 0) {
    const sem = seminars[semIndex];
    if (sem.availableSeats <= 0) {
      throw new Error("Sorry, no seats are available for this session.");
    }
    sem.registeredCount = (sem.registeredCount || 0) + 1;
    sem.availableSeats = Math.max(0, (sem.totalSeats || 100) - sem.registeredCount);
    seminars[semIndex] = sem;
    setLocalData(STORAGE_KEYS.SEMINARS, seminars);
  }

  // Save registration locally
  currentRegs.push(newReg);
  setLocalData(STORAGE_KEYS.REGISTRATIONS, currentRegs);

  return newReg;
};

export const getRegistrations = async (userId = null) => {
  if (isFirebaseConfigured && db) {
    try {
      let q = collection(db, "registrations");
      if (userId) {
        q = query(collection(db, "registrations"), where("userId", "==", userId));
      }
      const snap = await getDocs(q);
      if (!snap.empty) {
        return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      }
    } catch (e) {
      console.warn("Firestore getRegistrations failed, using local storage:", e.message);
    }
  }

  const all = getLocalData(STORAGE_KEYS.REGISTRATIONS, []);
  if (userId) {
    return all.filter(r => r.userId === userId);
  }
  return all;
};

// ==========================================
// STUDY PLANNER TASKS API
// ==========================================

export const getStudyTasks = async (userId = "guest") => {
  if (isFirebaseConfigured && db && userId !== "guest") {
    try {
      const q = query(collection(db, "study_tasks"), where("userId", "==", userId));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      }
    } catch (e) {
      console.warn("Firestore getStudyTasks failed, using local:", e.message);
    }
  }
  const key = `${STORAGE_KEYS.TASKS}_${userId}`;
  return getLocalData(key, INITIAL_TASKS);
};

export const saveStudyTask = async (taskData, userId = "guest") => {
  const taskId = taskData.id || `task-${Date.now()}`;
  const record = {
    ...taskData,
    id: taskId,
    userId,
    updatedAt: new Date().toISOString()
  };

  if (isFirebaseConfigured && db && userId !== "guest") {
    try {
      await setDoc(doc(db, "study_tasks", taskId), record, { merge: true });
    } catch (e) {
      console.warn("Firestore saveStudyTask failed:", e.message);
    }
  }

  const key = `${STORAGE_KEYS.TASKS}_${userId}`;
  const current = getLocalData(key, INITIAL_TASKS);
  const exists = current.findIndex(t => t.id === taskId);
  let updated;
  if (exists >= 0) {
    updated = [...current];
    updated[exists] = record;
  } else {
    updated = [record, ...current];
  }
  setLocalData(key, updated);
  return record;
};

export const deleteStudyTask = async (taskId, userId = "guest") => {
  if (isFirebaseConfigured && db && userId !== "guest") {
    try {
      await deleteDoc(doc(db, "study_tasks", taskId));
    } catch (e) {
      console.warn("Firestore deleteStudyTask failed:", e.message);
    }
  }
  const key = `${STORAGE_KEYS.TASKS}_${userId}`;
  const current = getLocalData(key, INITIAL_TASKS);
  const filtered = current.filter(t => t.id !== taskId);
  setLocalData(key, filtered);
  return true;
};

// ==========================================
// SAVED BOOKMARKS (Exams & Seminars)
// ==========================================

export const getSavedItems = async (userId = "guest") => {
  const key = `${STORAGE_KEYS.SAVED}_${userId}`;
  return getLocalData(key, { exams: ["upsc-cse", "ssc-cgl"], seminars: ["sem-upsc-psc-2026"] });
};

export const toggleSavedItem = async (type, itemId, userId = "guest") => {
  const key = `${STORAGE_KEYS.SAVED}_${userId}`;
  const current = getLocalData(key, { exams: [], seminars: [] });
  const list = current[type] || [];
  const exists = list.includes(itemId);

  const updatedList = exists ? list.filter(id => id !== itemId) : [...list, itemId];
  const updated = { ...current, [type]: updatedList };

  setLocalData(key, updated);

  if (isFirebaseConfigured && db && userId !== "guest") {
    try {
      await setDoc(doc(db, "saved_items", userId), updated, { merge: true });
    } catch (e) {
      console.warn("Firestore toggleSavedItem failed:", e.message);
    }
  }

  return { saved: !exists, data: updated };
};

// ==========================================
// ANNOUNCEMENTS
// ==========================================

export const getAnnouncements = async () => {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, "announcements"));
      if (!snap.empty) {
        return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      }
    } catch (e) {
      console.warn("Firestore getAnnouncements failed:", e.message);
    }
  }
  return getLocalData(STORAGE_KEYS.ANNOUNCEMENTS, INITIAL_ANNOUNCEMENTS);
};

export const addAnnouncement = async (announcementData) => {
  const id = `ann-${Date.now()}`;
  const record = {
    ...announcementData,
    id,
    date: new Date().toISOString().split("T")[0]
  };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, "announcements", id), record);
    } catch (e) {
      console.warn("Firestore addAnnouncement failed:", e.message);
    }
  }

  const current = getLocalData(STORAGE_KEYS.ANNOUNCEMENTS, INITIAL_ANNOUNCEMENTS);
  const updated = [record, ...current];
  setLocalData(STORAGE_KEYS.ANNOUNCEMENTS, updated);
  return record;
};

// ==========================================
// SEED DATABASE HELPER FOR ADMIN
// ==========================================

export const seedSampleDataToFirestore = async () => {
  if (!isFirebaseConfigured || !db) {
    // Reset local storage to clean sample state
    setLocalData(STORAGE_KEYS.EXAMS, INITIAL_EXAMS);
    setLocalData(STORAGE_KEYS.SEMINARS, INITIAL_SEMINARS);
    setLocalData(STORAGE_KEYS.ANNOUNCEMENTS, INITIAL_ANNOUNCEMENTS);
    return {
      success: true,
      message: "Sample data reset in Local Storage successfully! (Firebase not connected)",
      source: "local"
    };
  }

  let count = 0;
  for (const exam of INITIAL_EXAMS) {
    await setDoc(doc(db, "exams", exam.id), exam);
    count++;
  }
  for (const sem of INITIAL_SEMINARS) {
    await setDoc(doc(db, "seminars", sem.id), sem);
    count++;
  }
  for (const ann of INITIAL_ANNOUNCEMENTS) {
    await setDoc(doc(db, "announcements", ann.id), ann);
    count++;
  }

  return {
    success: true,
    message: `Successfully seeded ${count} sample records (Exams, Seminars, Announcements) to Cloud Firestore!`,
    source: "firestore"
  };
};
