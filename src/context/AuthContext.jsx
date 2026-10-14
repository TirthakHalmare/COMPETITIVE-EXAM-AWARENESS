import React, { createContext, useContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, isFirebaseConfigured } from "../services/firebase";
import { DEMO_USERS, getStoredAuthUser, setStoredAuthUser } from "../services/auth";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize Auth state
  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          // Fetch additional profile data from Firestore
          let role = "student";
          let additional = {};
          if (db) {
            try {
              const userDoc = await getDoc(doc(db, "users", user.uid));
              if (userDoc.exists()) {
                const data = userDoc.data();
                role = data.role || "student";
                additional = data;
              }
            } catch (e) {
              console.warn("Could not fetch user profile from Firestore:", e.message);
            }
          }
          const fullUser = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || user.email?.split("@")[0] || "Student",
            role,
            ...additional
          };
          setCurrentUser(fullUser);
          setStoredAuthUser(fullUser);
        } else {
          setCurrentUser(null);
          setStoredAuthUser(null);
        }
        setLoading(false);
      });
      return unsubscribe;
    } else {
      // In standalone/demo mode, load the saved demo user (or default student)
      const stored = getStoredAuthUser();
      setCurrentUser(stored);
      setLoading(false);
    }
  }, []);

  // Login handler
  const login = async (email, password) => {
    if (isFirebaseConfigured && auth) {
      const res = await signInWithEmailAndPassword(auth, email, password);
      return res.user;
    } else {
      // Demo authentication simulation
      const isAdminEmail = email.toLowerCase().includes("admin");
      const baseUser = isAdminEmail ? DEMO_USERS.admin : DEMO_USERS.student;
      const user = {
        ...baseUser,
        email,
        displayName: email.split("@")[0]
      };
      setCurrentUser(user);
      setStoredAuthUser(user);
      return user;
    }
  };

  // Sign up handler
  const signup = async (email, password, profileData = {}) => {
    if (isFirebaseConfigured && auth) {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      const initialProfile = {
        uid: user.uid,
        email: user.email,
        displayName: profileData.displayName || email.split("@")[0],
        role: profileData.role || "student",
        educationLevel: profileData.educationLevel || "Undergraduate",
        targetExams: profileData.targetExams || ["UPSC Civil Services"],
        dailyGoalHours: profileData.dailyGoalHours || 4,
        phone: profileData.phone || "",
        createdAt: new Date().toISOString()
      };

      if (db) {
        try {
          await setDoc(doc(db, "users", user.uid), initialProfile);
        } catch (e) {
          console.warn("Could not write user profile to Firestore:", e.message);
        }
      }

      const fullUser = { ...user, ...initialProfile };
      setCurrentUser(fullUser);
      setStoredAuthUser(fullUser);
      return fullUser;
    } else {
      const newUser = {
        uid: `user-${Date.now()}`,
        email,
        displayName: profileData.displayName || email.split("@")[0],
        role: profileData.role || "student",
        educationLevel: profileData.educationLevel || "Undergraduate",
        targetExams: profileData.targetExams || ["UPSC Civil Services"],
        dailyGoalHours: profileData.dailyGoalHours || 4,
        phone: profileData.phone || "",
        avatarUrl: DEMO_USERS.student.avatarUrl
      };
      setCurrentUser(newUser);
      setStoredAuthUser(newUser);
      return newUser;
    }
  };

  // Logout handler
  const logout = async () => {
    if (isFirebaseConfigured && auth) {
      await signOut(auth);
    }
    setCurrentUser(null);
    setStoredAuthUser(null);
  };

  // Update profile
  const updateUserProfile = async (updates) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updates };

    if (isFirebaseConfigured && db && currentUser.uid) {
      try {
        await setDoc(doc(db, "users", currentUser.uid), updates, { merge: true });
      } catch (e) {
        console.warn("Could not update user profile in Firestore:", e.message);
      }
    }

    setCurrentUser(updated);
    setStoredAuthUser(updated);
    return updated;
  };

  // Quick Switch for testing: Student vs Admin
  const switchDemoRole = (role) => {
    const selected = role === "admin" ? DEMO_USERS.admin : DEMO_USERS.student;
    setCurrentUser(selected);
    setStoredAuthUser(selected);
  };

  const isAdmin = currentUser?.role === "admin";

  const value = {
    currentUser,
    loading,
    isAdmin,
    isFirebase: isFirebaseConfigured,
    login,
    signup,
    logout,
    updateUserProfile,
    switchDemoRole
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
