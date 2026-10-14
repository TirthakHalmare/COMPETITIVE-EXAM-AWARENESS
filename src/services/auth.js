import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, isFirebaseConfigured } from "./firebase";

export const DEMO_USERS = {
  student: {
    uid: "demo-student-01",
    displayName: "Aarav Sharma",
    email: "student@example.com",
    role: "student",
    educationLevel: "Final Year B.Tech",
    targetExams: ["UPSC Civil Services", "SSC CGL"],
    dailyGoalHours: 4,
    avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    phone: "+91 98765 43210",
    college: "Pune University"
  },
  admin: {
    uid: "demo-admin-01",
    displayName: "Admin Officer",
    email: "admin@cea.gov.in",
    role: "admin",
    educationLevel: "Education Directorate",
    targetExams: ["All Exams"],
    dailyGoalHours: 8,
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    phone: "+91 99999 11111",
    college: "State Education Council"
  }
};

export const getStoredAuthUser = () => {
  try {
    const item = localStorage.getItem("cea_auth_user");
    return item ? JSON.parse(item) : DEMO_USERS.student;
  } catch (e) {
    return DEMO_USERS.student;
  }
};

export const setStoredAuthUser = (user) => {
  try {
    if (user) {
      localStorage.setItem("cea_auth_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("cea_auth_user");
    }
  } catch (e) {
    console.error("Error setting stored auth user:", e);
  }
};
