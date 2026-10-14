# Competitive Exam Awareness App 🎓
> A modern, responsive web application connecting college students and aspirants with competitive examination awareness, verified syllabus breakdowns, expert guidance seminars, and daily preparation planning.

---

## 🌟 Project Highlights

- **Frontend:** React 18 with Vite (Ultra-fast HMR)
- **Styling:** Tailwind CSS with custom educational palette & glassmorphism
- **Backend & Database:** Firebase Cloud Firestore & Firebase Authentication
- **Push & In-App Alerts:** Web Notifications API & Firebase Cloud Messaging (FCM)
- **Icons:** Lucide React
- **Architecture:** Zero-lockout dual layer — runs **immediately out-of-the-box in standalone/demo mode** with full offline persistence, and seamlessly connects to real Cloud Firestore and Firebase Auth when `.env` credentials are supplied.

---

## 🚀 Key Features

### 1. Student Dashboard
- Personalized welcome with avatar, target examinations, and daily study goal tracker.
- Next upcoming registered guidance seminar with active admission pass badge.
- Quick preparation metrics: saved examinations, confirmed seminar passes, today's task completion percentage, and 5-day study streak.
- Quick task creation widget with real-time status updates.

### 2. Competitive Exam Information Directory
Covers 8 major examination streams across Central, State, and Technical domains:
1. **UPSC Civil Services:** (IAS, IPS, IFS) - Detailed Prelims & Mains syllabus, 3-stage selection process, age limits, and official portal links.
2. **Staff Selection Commission (SSC):** SSC CGL & CHSL eligibility, computer module criteria, and Tier-1/Tier-2 breakdown.
3. **Banking Examinations:** IBPS PO, IBPS Clerk, and SBI PO speed test requirements, sectional cut-offs, and age relaxation matrix.
4. **Railway Recruitment Board (RRB):** RRB NTPC, JE, and ALP educational criteria and CBT-1/CBT-2 syllabus.
5. **Graduate Aptitude Test in Engineering (GATE):** Core branch syllabi, PSU appointment eligibility, and COAP counseling.
6. **Defence Examinations:** CDS, NDA, and AFCAT written exam formats plus 5-day SSB psychological and GTO testing overview.
7. **State Public Service Commission:** MPSC Rajyaseva descriptive syllabus, Marathi/English papers, and administrative posts.
8. **Undergraduate Professional Entrances:** JEE Main/Advanced and NEET-UG formats.

*Notice Policy:* Clearly designates verified dates from official commission annual projections. Never displays fabricated application deadlines.

### 3. Seminars & Online Guidance Sessions
- **Dedicated Hub:** Filter between All Sessions, Upcoming Webinars, Offline Campus Seminars, and Completed Sessions with Video Recordings.
- **Seat Availability Tracking:** Dynamic progress bars displaying total seat capacity, confirmed reservations, and remaining spots.
- **Registration Flow:** Validates attendee information, detects duplicate registrations, decrements available seats in Firestore transaction, and generates an **instant digital admission pass with unique Pass ID**.
- **Handouts & Study Notes:** Details free PDFs, formula sheets, and booklists provided to registered attendees.
- **Calendar Integration:** 1-click addition to Google Calendar and direct meeting room links.

### 4. Preparation Strategies & Blueprints
- **Exam-Specific Roadmaps:** Dedicated strategies for UPSC, Banking, SSC, Railways, and GATE.
- **Timetable Blueprints:**
  - *Full-Time Aspirant Blueprint:* 8-hour structured routine.
  - *College Student Routine:* The **3+1 Formula** (3 hours core + 1 hour current affairs) for undergraduates balancing degree lectures.
- **Productivity Techniques:** Pomodoro 50/10 time-boxing, Eisenhower Matrix, and Digital Detox.
- **Mock Test Diagnostic Framework:** The **1:2 Ratio** (1 hour testing : 2 hours error log dissection).
- **Spaced Repetition Protocol:** The 1-3-7-30 rule combating the Ebbinghaus forgetting curve.
- **Common Mistakes to Avoid:** Book hoarding, skipping mock tests, and over-answering under negative marking.

### 5. Interactive Study Planner
- Create daily subject tasks with duration (15m to 3h), target date, and priority badges.
- Check off completed tasks with real-time progress calculations.
- Automatic calculation of scheduled study hours and weekly completion percentages.
- Filter by All, Pending, Completed, or Today's Targets.
- Synchronized to Cloud Firestore for authenticated accounts (with LocalStorage fallback).

### 6. Notifications & Push Alert Center
- In-app notification center tracking seminar registration passes, upcoming deadlines, and study reminders.
- Native browser push notification permission handler.
- Mark as read, filter by alert category, and delete alerts.
- Transparent notice policy: only confirms push notifications when browser permission is genuinely granted.

### 7. User Authentication & Profile
- Student registration and login with email and password.
- Profile customization: name, education level, college, target exams (multiselect badges), and daily goal hours.
- Protected personal registration history and study planner state.
- **1-Click Demo Evaluation Switch:** Test both the Student perspective and Administrator dashboard instantly with zero friction.

### 8. Admin Control Dashboard
Protected management dashboard for platform directors:
- **Manage Seminars:** Add new offline seminars or online webinars, edit descriptions, adjust seat capacities, or delete sessions.
- **Manage Exams:** Update syllabus modules, exam dates, eligibility criteria, and fee structures.
- **Attendee Registration Desk:** Real-time searchable roster of students registered for each seminar with verified contact info.
- **Broadcast Announcements:** Publish urgent alerts that immediately display across all student feeds.
- **1-Click Database Seeder:** Button to populate or reset sample datasets in Cloud Firestore with realistic entries.

---

## 🛠️ Project Structure

```
competitive-exam-awareness/
├── .env.example                 # Firebase environment configuration template
├── firebase.json                # Firebase hosting & firestore rules config
├── firestore.rules              # Role-based Cloud Firestore security rules
├── index.html                   # HTML5 shell with Google Fonts & favicon
├── package.json                 # Project dependencies & build scripts
├── postcss.config.js            # PostCSS configuration
├── tailwind.config.js           # Tailwind CSS configuration with brand colors
├── vite.config.js               # Vite configuration (port 3000)
└── src/
    ├── main.jsx                 # Application entry point
    ├── App.jsx                  # Router, modal coordination & providers
    ├── index.css                # Tailwind directives & glassmorphic styles
    ├── context/
    │   ├── AuthContext.jsx      # Firebase Auth state & demo role switching
    │   ├── DataContext.jsx      # Exams, seminars, planner tasks & admin ops
    │   └── NotificationContext.jsx # In-app notifications & push permissions
    ├── services/
    │   ├── firebase.js          # Safe Firebase initialization with fallback
    │   ├── db.js                # Cloud Firestore abstraction layer
    │   ├── auth.js              # Authentication helpers & demo accounts
    │   └── notifications.js     # Web Notifications & FCM integration
    ├── data/
    │   └── sampleData.js        # Comprehensive initial exam & seminar dataset
    ├── components/
    │   ├── common/
    │   │   ├── Navbar.jsx       # Responsive navigation with badge counters
    │   │   ├── Footer.jsx       # Official portals, mission & notice policy
    │   │   ├── Modal.jsx        # Accessible modal dialog
    │   │   ├── Badge.jsx        # Pill badges with semantic variants
    │   │   └── Toast.jsx        # Toast notification system
    │   ├── exams/
    │   │   ├── ExamCard.jsx     # Exam preview card with qualification info
    │   │   └── ExamFilterBar.jsx# Category pills & live search bar
    │   ├── seminars/
    │   │   ├── SeminarCard.jsx  # Seminar card with seat progress bar
    │   │   └── RegisterModal.jsx# Registration form & digital pass issuance
    │   ├── planner/
    │   │   ├── TaskItem.jsx     # Checklist task with priority & subject tags
    │   │   └── TaskFormModal.jsx# Create & edit task dialog
    │   └── admin/
    │       ├── AdminExamModal.jsx      # Create/edit competitive exam
    │       ├── AdminSeminarModal.jsx   # Create/edit guidance session
    │       └── AdminAnnouncementModal.jsx # Broadcast alert dialog
    └── pages/
        ├── HomePage.jsx         # Hero, next seminar spotlight & popular exams
        ├── DashboardPage.jsx    # Student dashboard with passes & planner
        ├── ExamsPage.jsx        # Competitive exams directory with filters
        ├── ExamDetailsPage.jsx  # Syllabus, eligibility, books & related sessions
        ├── SeminarsPage.jsx     # Seminars hub with webinars & recordings
        ├── SeminarDetailsPage.jsx # Schedule, speaker bio & admission pass
        ├── StrategiesPage.jsx   # Timetables, revision rules & mock test guide
        ├── PlannerPage.jsx      # Interactive daily study planner
        ├── SavedPage.jsx        # Bookmarked exams & saved seminars
        ├── NotificationsPage.jsx# In-app notification center & push toggles
        ├── ProfilePage.jsx      # Student target exams & registration history
        ├── AuthPage.jsx         # Sign in, sign up & 1-click demo switcher
        └── AdminDashboardPage.jsx # Full management & attendee desk
```

---

## ⚡ Quick Start Guide

### Step 1: Install Dependencies
Open a terminal in the project directory:
```bash
npm install
```

### Step 2: Run Development Server
```bash
npm run dev
```
The application will launch at `http://localhost:3000`.

### Step 3: Instant Evaluation with Demo Accounts
You can immediately evaluate all features without setting up Firebase:
- Click **"Student"** in the top navigation bar to test seminar registration, study planning, and exam bookmarking.
- Click **"Admin"** to test adding/editing seminars, updating syllabi, viewing registered student rosters, and seeding sample data.

---

## 🔐 Firebase Setup (Optional for Cloud Sync)

To connect the application to your own Firebase project:

1. **Create a Firebase Project:**
   Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. **Enable Authentication:**
   - Under **Build > Authentication**, click *Get Started*.
   - Enable **Email/Password** as a sign-in provider.
3. **Enable Cloud Firestore:**
   - Under **Build > Firestore Database**, click *Create database*.
   - Start in **Production mode** (or test mode).
4. **Copy Configuration to `.env`:**
   Create a `.env` file in the project root based on `.env.example`:
   ```env
   VITE_FIREBASE_API_KEY=AIzaSy...
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
   ```
5. **Deploy Security Rules:**
   Use Firebase CLI to deploy `firestore.rules`:
   ```bash
   firebase deploy --only firestore:rules
   ```
6. **Seed Initial Data:**
   Sign in as an administrator, navigate to the **Admin Dashboard**, and click **"Seed / Reset Sample Data"** to upload all exams, seminars, and announcements to your Firestore database in 1 click!

---

## 🛡️ License
Released under the MIT License for educational empowerment and student guidance.
