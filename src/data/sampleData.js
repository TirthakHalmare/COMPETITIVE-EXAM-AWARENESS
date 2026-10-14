export const INITIAL_EXAMS = [
  {
    id: "upsc-cse",
    name: "UPSC Civil Services",
    fullName: "Union Public Service Commission - Civil Services Examination",
    category: "Civil Services",
    conductingBody: "Union Public Service Commission (UPSC)",
    shortDesc: "Premier nationwide examination for recruitment to higher civil services including IAS, IPS, IFS, and IRS.",
    difficultyLevel: "High",
    averagePrepTime: "12 - 18 Months",
    vacanciesSample: "Approximately 1,000+ posts annually",
    eligibility: {
      education: "Graduation degree in any discipline from a recognized University or equivalent qualification.",
      ageLimit: "21 to 32 years as on August 1 of exam year (Relaxation: 3 years for OBC, 5 years for SC/ST, 10 years for PwD).",
      nationality: "Indian Citizen (for IAS & IPS); other services allow subjects of Nepal, Bhutan, or Tibetan refugees.",
      attempts: "General: 6 attempts | OBC: 9 attempts | SC/ST: Unlimited (within age limit)."
    },
    selectionProcess: [
      { stage: "Stage 1: Preliminary Exam (Objective)", details: "Paper I (General Studies - 200 marks) & Paper II (CSAT - 200 marks, qualifying at 33%). Negative marking of 1/3rd." },
      { stage: "Stage 2: Main Examination (Written)", details: "9 descriptive papers (2 qualifying language papers + Essay + 4 General Studies papers + 2 Optional subject papers). Total 1750 marks." },
      { stage: "Stage 3: Personality Test (Interview)", details: "Face-to-face board interview assessing mental alertness, leadership, and public service ethos. 275 marks." }
    ],
    syllabus: {
      prelims: [
        "Current events of national and international importance",
        "History of India and Indian National Movement",
        "Indian and World Geography - Physical, Social, Economic",
        "Indian Polity and Governance - Constitution, Political System, Panchayati Raj, Public Policy",
        "Economic and Social Development - Sustainable Development, Poverty, Inclusion, Demographics",
        "General issues on Environmental Ecology, Biodiversity, and Climate Change",
        "General Science and Technological Advancements",
        "CSAT: Reading Comprehension, Logical Reasoning, Basic Numeracy (Class X level)"
      ],
      mains: [
        "Essay Writing: Two essays on philosophical, socio-economic or governance themes",
        "GS Paper I: Indian Heritage, History, Culture and World Geography",
        "GS Paper II: Governance, Constitution, Polity, Social Justice and International Relations",
        "GS Paper III: Technology, Economic Development, Biodiversity, Environment, Security & Disaster Management",
        "GS Paper IV: Ethics, Integrity, Aptitude and Case Studies",
        "Optional Subject: Choice of 1 subject (2 detailed papers of 250 marks each)"
      ]
    },
    importantDates: {
      notificationDate: "February 2026",
      applicationStart: "February 2026",
      applicationDeadline: "March 2026",
      prelimsDate: "May 24, 2026",
      mainsDate: "September 2026",
      isTentative: true,
      officialNoticeNote: "Dates based on UPSC Annual Calendar. Check the official UPSC portal for exact dates."
    },
    applicationInfo: {
      fee: "₹100 (Female / SC / ST / PwD candidates exempt)",
      portal: "https://upsconline.nic.in",
      officialWebsite: "https://upsc.gov.in"
    },
    tags: ["UPSC", "IAS", "IPS", "Civil Services", "Central Govt"],
    recommendedBooks: [
      "Indian Polity by M. Laxmikanth",
      "A Brief History of Modern India by Spectrum (Rajiv Ahir)",
      "Certificate Physical and Human Geography by G.C. Leong",
      "Indian Economy by Ramesh Singh or Nitin Singhania",
      "Environment by Shankar IAS Academy"
    ]
  },
  {
    id: "ssc-cgl",
    name: "SSC CGL",
    fullName: "Staff Selection Commission - Combined Graduate Level",
    category: "SSC",
    conductingBody: "Staff Selection Commission (SSC)",
    shortDesc: "Recruitment to Group 'B' and Group 'C' gazetted & non-gazetted posts across various Central Ministries, Departments, and Organizations.",
    difficultyLevel: "Moderate to High",
    averagePrepTime: "6 - 9 Months",
    vacanciesSample: "14,000+ posts in recent cycles",
    eligibility: {
      education: "Bachelor's degree from a recognized university. Specific posts (like Junior Statistical Officer) require Statistics/Maths at degree or 10+2 level.",
      ageLimit: "18 to 30/32 years depending on specific post profile (Relaxation as per central government norms).",
      nationality: "Indian Citizen.",
      attempts: "No attempt limit as long as age criteria is met."
    },
    selectionProcess: [
      { stage: "Tier-I (Computer Based Examination)", details: "Qualifying objective test with 100 questions (200 marks): General Intelligence & Reasoning, General Awareness, Quantitative Aptitude, English Comprehension. Negative marking: 0.50 marks." },
      { stage: "Tier-II (Computer Based Examination)", details: "Paper-I (Compulsory for all posts): Mathematical Abilities, Reasoning, English, General Awareness, Computer Knowledge Module, and Data Entry Speed Test (DEST)." },
      { stage: "Document Verification & Medical", details: "Conducted by user departments following final merit list ranking." }
    ],
    syllabus: {
      prelims: [
        "Quantitative Aptitude: Arithmetic, Algebra, Geometry, Trigonometry, Data Interpretation",
        "Reasoning: Analogies, Coding-Decoding, Blood Relations, Syllogisms, Non-verbal series",
        "English: Spotting Errors, Reading Comprehension, Idioms & Phrases, Cloze Test",
        "General Awareness: Indian History, Geography, Polity, Science, Current Affairs"
      ],
      mains: [
        "Advanced Quantitative Abilities & Statistics",
        "Reasoning and General Intelligence",
        "English Language and In-depth Comprehension",
        "Computer Knowledge: Basics of CPU, Memory, MS Office, Internet protocols, Cyber security basics",
        "Typing / Data Entry Speed Test (minimum 27 words/min / 2000 key depressions in 15 mins)"
      ]
    },
    importantDates: {
      notificationDate: "June 2026",
      applicationStart: "June 2026",
      applicationDeadline: "July 2026",
      prelimsDate: "September / October 2026",
      mainsDate: "December 2026",
      isTentative: true,
      officialNoticeNote: "Dates are indicative based on SSC calendar. Refer to official notification."
    },
    applicationInfo: {
      fee: "₹100 (Women, SC, ST, PwD, and ESM are exempt)",
      portal: "https://ssc.gov.in",
      officialWebsite: "https://ssc.gov.in"
    },
    tags: ["SSC", "CGL", "Inspector", "Central Government", "Graduate"],
    recommendedBooks: [
      "Quantitative Aptitude for Competitive Examinations by R.S. Aggarwal",
      "A Modern Approach to Verbal & Non-Verbal Reasoning by R.S. Aggarwal",
      "English for General Competitions by Neetu Singh (Plinth to Paramount)",
      "Lucent's General Knowledge"
    ]
  },
  {
    id: "ibps-po",
    name: "IBPS PO",
    fullName: "Institute of Banking Personnel Selection - Probationary Officer / Management Trainee",
    category: "Banking",
    conductingBody: "Institute of Banking Personnel Selection (IBPS)",
    shortDesc: "Annual national exam for selecting Probationary Officers across 11 Public Sector Participating Banks in India.",
    difficultyLevel: "Moderate",
    averagePrepTime: "4 - 8 Months",
    vacanciesSample: "4,000 - 5,000+ vacancies annually",
    eligibility: {
      education: "Graduation degree in any discipline from a recognized university.",
      ageLimit: "20 to 30 years (OBC: +3 yrs, SC/ST: +5 yrs, PwD: +10 yrs).",
      nationality: "Indian Citizen.",
      attempts: "No attempt restrictions within age limits."
    },
    selectionProcess: [
      { stage: "Phase 1: Preliminary Exam (Online)", details: "100 marks, 1 hour. English (30 Qs), Quantitative Aptitude (35 Qs), Reasoning Ability (35 Qs). Sectional cut-offs apply." },
      { stage: "Phase 2: Main Examination (Online + Descriptive)", details: "200 objective marks (Reasoning, Computer, Data Analysis, General & Banking Awareness, English) + 25 marks Descriptive test (Letter & Essay)." },
      { stage: "Phase 3: Common Interview", details: "Conducted by participating banks and coordinated by IBPS (100 marks, qualifying min 40%)." }
    ],
    syllabus: {
      prelims: [
        "Reasoning: Puzzles, Seating Arrangement, Syllogisms, Inequalities, Input-Output",
        "Quantitative Aptitude: Number Series, Simplification, Quadratic Equations, Data Interpretation (Table, Pie, Bar)",
        "English: Reading Comprehension, Sentence Rearrangement, Error Correction, Fillers"
      ],
      mains: [
        "Data Analysis & Interpretation (Advanced Caselets, Radar Graphs, Missing DI)",
        "Reasoning & Computer Aptitude (High-level seating arrangements, machine input)",
        "General / Economy / Banking Awareness (Monetary Policy, RBI Guidelines, Current Financial News)",
        "English Descriptive: Letter writing (formal/informal) and Essay on socio-economic topics"
      ]
    },
    importantDates: {
      notificationDate: "August 2026",
      applicationStart: "August 2026",
      applicationDeadline: "August end 2026",
      prelimsDate: "October 2026",
      mainsDate: "November 2026",
      isTentative: true,
      officialNoticeNote: "Dates based on IBPS Tentative Calendar."
    },
    applicationInfo: {
      fee: "₹850 for General/OBC/EWS; ₹175 for SC/ST/PwD",
      portal: "https://ibps.in",
      officialWebsite: "https://ibps.in"
    },
    tags: ["Banking", "IBPS", "Bank PO", "Finance", "Public Sector"],
    recommendedBooks: [
      "Fast Track Objective Arithmetic by Rajesh Verma",
      "Magical Book on Quicker Maths by M. Tyra",
      "Banking Awareness by Arihant Publications",
      "Word Power Made Easy by Norman Lewis"
    ]
  },
  {
    id: "rrb-ntpc",
    name: "RRB NTPC",
    fullName: "Railway Recruitment Board - Non-Technical Popular Categories",
    category: "Railways",
    conductingBody: "Railway Recruitment Boards (Ministry of Railways)",
    shortDesc: "Recruitment for station masters, goods guards, commercial clerks, junior accounts assistants across Indian Railways.",
    difficultyLevel: "Moderate",
    averagePrepTime: "5 - 7 Months",
    vacanciesSample: "11,558+ posts in current cycle",
    eligibility: {
      education: "Undergraduate posts: 12th pass (min 50%). Graduate posts: Bachelor's degree in any stream.",
      ageLimit: "18 to 33 years for 12th level; 18 to 36 years for Graduate level (including 3 years COVID relaxation).",
      nationality: "Indian Citizen.",
      attempts: "No attempt restrictions within age limits."
    },
    selectionProcess: [
      { stage: "1st Stage Computer Based Test (CBT-1)", details: "Common screening exam with 100 questions (General Awareness 40, Mathematics 30, General Intelligence 30). Negative marking: 1/3rd." },
      { stage: "2nd Stage Computer Based Test (CBT-2)", details: "120 questions in 90 minutes. Level-specific tests for pay levels 2, 3, 5, and 6." },
      { stage: "Typing Skill Test / Computer Based Aptitude Test (CBAT)", details: "For Station Master / Traffic Assistant (CBAT) and Clerical posts (Typing test)." },
      { stage: "Document Verification & Medical Exam", details: "Strict fitness test as per railway medical categories (A-2, A-3, B-2, C-2)." }
    ],
    syllabus: {
      prelims: [
        "General Awareness: Indian Railways history, Science & Tech, Sports, Current Events, Indian Polity & Geography",
        "Mathematics: Number System, Decimals, Fractions, LCM-HCF, Ratio & Proportion, Percentage, Mensuration, Time & Work",
        "General Intelligence & Reasoning: Analogies, Completion of Number and Alphabetical Series, Coding & Decoding, Mathematical Operations"
      ],
      mains: [
        "In-depth General Awareness with focus on Indian Economy, General Science (up to 10th CBSE), Modern Indian History",
        "Advanced Arithmetic, Elementary Statistics, Simple & Compound Interest, Profit & Loss",
        "Complex Puzzles, Venn Diagrams, Syllogism, Jumbling, Statement-Conclusion"
      ]
    },
    importantDates: {
      notificationDate: "September 2026",
      applicationStart: "September 2026",
      applicationDeadline: "October 2026",
      prelimsDate: "December 2026 / January 2027",
      mainsDate: "March 2027",
      isTentative: true,
      officialNoticeNote: "Dates are indicative; follow your regional RRB portal (e.g. rrbmumbai, rrbcdg)."
    },
    applicationInfo: {
      fee: "₹500 (₹400 refunded after appearing in CBT-1); ₹250 for SC/ST/Female/Ex-SM (fully refunded after CBT-1)",
      portal: "https://www.rrbapply.gov.in",
      officialWebsite: "https://indianrailways.gov.in"
    },
    tags: ["Railways", "RRB", "NTPC", "Central Govt", "Station Master"],
    recommendedBooks: [
      "Railway Non-Technical (NTPC) Guide by Disha Experts",
      "General Knowledge for Railway Exams by Manohar Pandey",
      "Kiran's Railway Non-Technical Practice Work Book"
    ]
  },
  {
    id: "gate",
    name: "GATE",
    fullName: "Graduate Aptitude Test in Engineering",
    category: "Engineering & GATE",
    conductingBody: "Indian Institute of Science (IISc) / IITs on rotational basis",
    shortDesc: "National examination for admission to Master's programs and direct recruitment to premier PSUs (IOCL, ONGC, NTPC, BHEL, DRDO).",
    difficultyLevel: "High",
    averagePrepTime: "8 - 12 Months",
    vacanciesSample: "Qualifying score valid for 3 years; thousands of PSU & M.Tech seats",
    eligibility: {
      education: "Candidates currently in 3rd or higher year of undergraduate degree in Engineering/Technology or completed Master's degree in relevant science subjects.",
      ageLimit: "No age limit.",
      nationality: "Indian and international applicants from eligible countries.",
      attempts: "No limitation on attempts."
    },
    selectionProcess: [
      { stage: "Single Computer Based Test (CBT)", details: "3-hour exam with 65 questions (Total 100 marks). 10 questions in General Aptitude (15 marks) + 55 subject questions (85 marks). Questions are MCQs, MSQs (Multiple Select), and NATs (Numerical Answer Type)." },
      { stage: "COAP / CCMT Counselling & PSU Interviews", details: "Score card used directly for PSU shortlisting and IIT/NIT admissions." }
    ],
    syllabus: {
      prelims: [
        "Engineering Mathematics: Linear Algebra, Calculus, Differential Equations, Complex Variables, Probability and Statistics",
        "General Aptitude: Verbal Aptitude, Quantitative Aptitude, Analytical Aptitude, Spatial Aptitude",
        "Core Branch Subjects: Specialized engineering domain (Computer Science, Mechanical, Civil, Electrical, Electronics, etc.)"
      ],
      mains: [
        "Deep application-level analytical problems, circuit analysis, algorithms, structural mechanics, thermodynamic cycles"
      ]
    },
    importantDates: {
      notificationDate: "August 2026",
      applicationStart: "August 2026",
      applicationDeadline: "September end 2026",
      prelimsDate: "February 7-8 & 14-15, 2027",
      mainsDate: "N/A (Single Exam)",
      isTentative: true,
      officialNoticeNote: "Dates announced on the official GATE portal organized by the conducting IIT."
    },
    applicationInfo: {
      fee: "₹1,800 for General/OBC; ₹900 for Female/SC/ST/PwD",
      portal: "https://gate.iitk.ac.in",
      officialWebsite: "https://gate2025.iitr.ac.in"
    },
    tags: ["GATE", "Engineering", "PSU", "M.Tech", "Technical"],
    recommendedBooks: [
      "Higher Engineering Mathematics by B.S. Grewal",
      "Standard branch textbooks & Previous 25 Years Solved Papers by Made Easy / ACE Academy"
    ]
  },
  {
    id: "defence-cds-nda",
    name: "Defence: CDS & NDA",
    fullName: "UPSC Combined Defence Services (CDS) & National Defence Academy (NDA)",
    category: "Defence",
    conductingBody: "Union Public Service Commission (UPSC) & Service Selection Board (SSB)",
    shortDesc: "Prestigious entry into Indian Armed Forces (Army, Navy, Air Force) as commissioned officers.",
    difficultyLevel: "High (Exam + 5-Day SSB Interview)",
    averagePrepTime: "6 - 10 Months",
    vacanciesSample: "Approximately 400 seats per cycle (held twice a year: I & II)",
    eligibility: {
      education: "NDA: 12th pass (Physics & Maths for Air Force/Navy). CDS: Graduation degree (Engineering for Naval/Air Force Academy).",
      ageLimit: "NDA: 16.5 to 19.5 years | CDS: 19 to 24/25 years. Unmarried male & female candidates as per latest rules.",
      nationality: "Indian Citizen.",
      attempts: "Within age eligibility brackets."
    },
    selectionProcess: [
      { stage: "Stage 1: Written Examination", details: "Objective exam on English, General Knowledge, and Elementary Mathematics (IMA, INA, AFA). OTA excludes Maths." },
      { stage: "Stage 2: 5-Day SSB Interview", details: "Rigorous psychological tests, Group Testing Officer (GTO) outdoor tasks, Conference, and personal interview." },
      { stage: "Stage 3: Medical Examination", details: "Conducted at military base hospitals adhering to strict armed forces medical and physical standards." }
    ],
    syllabus: {
      prelims: [
        "English: Synonyms, Antonyms, Spotting Errors, Para-jumbles, Ordering of Sentences",
        "General Knowledge: Defence Current Affairs, Indian Constitution, Modern History, World Physical Geography, Everyday Physics, Chemistry and Biology",
        "Elementary Mathematics: Arithmetic, Number Theory, Trigonometry, Geometry, Mensuration, Statistics"
      ],
      mains: [
        "SSB Screening: Officer Intelligence Rating (OIR) test and Picture Perception & Discussion Test (PPDT)",
        "SSB Stage II: Psychology tests (TAT, WAT, SRT, Self-Description), GTO tasks (GD, GPE, PGT, HGT, Command Task), Personal Interview"
      ]
    },
    importantDates: {
      notificationDate: "December 2025 (Cycle I) & May 2026 (Cycle II)",
      applicationStart: "December / May",
      applicationDeadline: "January / June",
      prelimsDate: "April 2026 (Cycle I) & September 2026 (Cycle II)",
      mainsDate: "SSB Interviews 4 months after written result",
      isTentative: false,
      officialNoticeNote: "Conducted bi-annually by UPSC according to fixed calendar."
    },
    applicationInfo: {
      fee: "₹200 for CDS / ₹100 for NDA (Female/SC/ST candidates exempt)",
      portal: "https://upsconline.nic.in",
      officialWebsite: "https://upsc.gov.in"
    },
    tags: ["Defence", "Army", "Navy", "Air Force", "SSB", "Officer"],
    recommendedBooks: [
      "Pathfinder for CDS / NDA Examination by Arihant",
      "SSB Interview: The Complete Guide by Dr. N.K. Natarajan",
      "General Knowledge by Dr. Binay Karna (Lucent)"
    ]
  },
  {
    id: "mpsc-rajyaseva",
    name: "MPSC State Services",
    fullName: "Maharashtra Public Service Commission - Civil Services (Rajyaseva)",
    category: "State PSC",
    conductingBody: "Maharashtra Public Service Commission (MPSC)",
    shortDesc: "State administrative services recruiting Deputy Collector, DySP, Tehsildar, and block development officers in Maharashtra.",
    difficultyLevel: "High",
    averagePrepTime: "10 - 14 Months",
    vacanciesSample: "300 - 500+ Grade A and B state posts",
    eligibility: {
      education: "Graduation degree from a recognized university. Knowledge of Marathi language is compulsory.",
      ageLimit: "19 to 38 years for Open category (43 years for reserved categories).",
      nationality: "Indian Citizen with Maharashtra domicile certificate preferred/required for state quotas.",
      attempts: "Open category: 6 attempts | OBC: 9 attempts | SC/ST: No limit."
    },
    selectionProcess: [
      { stage: "Preliminary Exam", details: "Paper 1 (General Studies - 200 marks) & Paper 2 (CSAT - 200 marks, qualifying at 33%)." },
      { stage: "Main Examination (Descriptive Pattern)", details: "Aligned closely with UPSC descriptive pattern: Marathi & English qualifying papers, Essay, and 4 General Studies papers." },
      { stage: "Personality Interview", details: "Interview evaluating state administration knowledge, socio-economic issues of Maharashtra, and decision making." }
    ],
    syllabus: {
      prelims: [
        "History of India with special reference to Maharashtra and Indian National Movement",
        "Maharashtra, India and World Geography - Physical, Social, Economic Geography",
        "Maharashtra and India - Polity and Governance, Constitution, Political System, Panchayati Raj",
        "Economic and Social Development of Maharashtra and India",
        "Environmental Ecology, Biodiversity and Climate Change",
        "Current events of state, national and international importance"
      ],
      mains: [
        "Descriptive Marathi and English language papers",
        "Essay paper in English or Marathi",
        "GS 1: History, Geography and Agriculture of Maharashtra and India",
        "GS 2: Indian Constitution and Politics with special reference to Maharashtra governance",
        "GS 3: Human Resource Development and Human Rights",
        "GS 4: Economy and Planning, Economics of Agriculture, Science and Technology"
      ]
    },
    importantDates: {
      notificationDate: "January 2026",
      applicationStart: "January 2026",
      applicationDeadline: "February 2026",
      prelimsDate: "April / May 2026",
      mainsDate: "October 2026",
      isTentative: true,
      officialNoticeNote: "Subject to official MPSC notification updates."
    },
    applicationInfo: {
      fee: "₹394 for Unreserved; ₹294 for Reserved categories",
      portal: "https://mpsconline.gov.in",
      officialWebsite: "https://mpsc.gov.in"
    },
    tags: ["MPSC", "State PSC", "Maharashtra", "Deputy Collector", "Rajyaseva"],
    recommendedBooks: [
      "Adhunik Maharashtracha Itihas by Dr. S.S. Kathare",
      "Maharashtra Bhugol by A.B. Savadi",
      "Bhartiya Rajyaghatna by K. Sagar or Ranjan Kolambe",
      "Bhartiya Arthavyavastha by Ranjan Kolambe / Kiran Desale"
    ]
  },
  {
    id: "neet-jee",
    name: "JEE & NEET",
    fullName: "Joint Entrance Examination (JEE Main/Adv) & National Eligibility cum Entrance Test (NEET UG)",
    category: "Undergraduate Professional",
    conductingBody: "National Testing Agency (NTA) & IITs",
    shortDesc: "National benchmark entrance examinations for premier engineering (IITs, NITs) and medical colleges (AIIMS, State Medical Colleges).",
    difficultyLevel: "High",
    averagePrepTime: "12 - 24 Months",
    vacanciesSample: "Over 20,000+ IIT/NIT engineering seats; 100,000+ MBBS seats",
    eligibility: {
      education: "10+2 with Physics, Chemistry, Mathematics (for JEE) or Physics, Chemistry, Biology (for NEET) with specified minimum marks.",
      ageLimit: "NEET: Minimum 17 years, no upper age limit. JEE: Maximum 3 consecutive years from year of passing 12th.",
      nationality: "Indian Nationals, NRIs, OCIs.",
      attempts: "JEE Main: 3 consecutive years | JEE Advanced: 2 consecutive years | NEET: Unlimited."
    },
    selectionProcess: [
      { stage: "Computer Based Test (JEE) / Pen & Paper (NEET)", details: "JEE Main in 2 sessions (Jan & April). Top 2.5 lakh candidates qualify for JEE Advanced. NEET UG is single-window 720-mark objective examination." },
      { stage: "JoSAA / MCC Centralized Counseling", details: "All-India and State quota counseling based on national merit percentiles." }
    ],
    syllabus: {
      prelims: [
        "Physics: Mechanics, Thermodynamics, Electrodynamics, Optics, Modern Physics (Class 11 & 12 NCERT core)",
        "Chemistry: Physical Chemistry, Inorganic Chemistry, Organic Chemistry mechanisms",
        "Mathematics (JEE): Algebra, Calculus, Coordinate Geometry, Vectors & 3D, Trigonometry",
        "Biology (NEET): Botany, Zoology, Human Physiology, Genetics, Ecology, Cell Biology"
      ],
      mains: [
        "Advanced multi-concept problem solving and comprehensive analytical questions"
      ]
    },
    importantDates: {
      notificationDate: "November 2025",
      applicationStart: "November 2025",
      applicationDeadline: "December 2025",
      prelimsDate: "JEE Session 1: Jan 2026 | Session 2: Apr 2026 | NEET: May 2026",
      mainsDate: "JEE Advanced: Late May 2026",
      isTentative: true,
      officialNoticeNote: "Dates announced annually on official NTA portals."
    },
    applicationInfo: {
      fee: "JEE: ₹1,000 (General Male) / NEET: ₹1,700 (General)",
      portal: "https://jeemain.nta.nic.in / https://neet.ntaonline.in",
      officialWebsite: "https://nta.ac.in"
    },
    tags: ["JEE", "NEET", "Engineering", "Medical", "IIT", "AIIMS"],
    recommendedBooks: [
      "NCERT Textbooks (Physics, Chemistry, Biology) Class 11 & 12 (Mandatory Bible)",
      "Concepts of Physics by H.C. Verma (Vol 1 & 2)",
      "Problems in General Physics by I.E. Irodov (JEE Advanced)",
      "Objective NCERT at your Fingertips by MTG (for NEET Biology)"
    ]
  }
];

export const INITIAL_SEMINARS = [
  {
    id: "sem-upsc-psc-2026",
    title: "How to Prepare for UPSC and State PSC Examinations",
    topic: "Comprehensive Roadmap: Prelims to Interview Strategy & Optional Selection",
    description: "An intensive guidance session by a former civil servant breaking down how to balance college academics with UPSC/PSC preparation, master NCERTs, make effective current affairs notes from The Hindu/Indian Express, and craft high-scoring mains answers.",
    mode: "Hybrid", // Online + Offline
    speaker: {
      name: "Dr. Arvind Sharma, IAS (Retd.)",
      designation: "Former Principal Secretary & Civil Services Mentor",
      bio: "Over 28 years of administrative experience and mentor to 350+ successful civil servants across India.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    date: "2026-10-25",
    time: "10:30 AM - 1:00 PM IST",
    venue: "Main Auditorium, Central Youth Cultural Centre, Shivaji Nagar, Pune",
    meetingLink: "https://meet.google.com/upsc-prep-awareness-2026",
    category: "Civil Services",
    totalSeats: 250,
    registeredCount: 182,
    availableSeats: 68,
    status: "upcoming", // upcoming, completed
    recordingUrl: null,
    materialsProvided: ["Syllabus Micro-Breakdown PDF", "Recommended Booklist & Source Matrix", "Previous 5 Years Mains Questions Trend Sheet"],
    targetAudience: "College Undergraduates (2nd, 3rd, Final Year) and Recent Graduates"
  },
  {
    id: "sem-ssc-banking-2026",
    title: "SSC CGL and Banking Exam Preparation Strategies",
    topic: "Speed Calculation Techniques, Reasoning Shortcuts & Mock Test Analysis",
    description: "Join SBI PO & SSC CGL toppers for an interactive workshop focused on cracking competitive quant & reasoning sections within tight time constraints, avoiding negative marking, and achieving 99+ percentile in prelims.",
    mode: "Online",
    speaker: {
      name: "Neha Kulkarni",
      designation: "SBI PO (Rank 34) & Quantitative Aptitude Educator",
      bio: "Scored full marks in Quantitative Aptitude; trained 10,000+ banking and SSC aspirants online.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    },
    date: "2026-10-28",
    time: "5:00 PM - 7:00 PM IST",
    venue: "Live Interactive Webinar (Zoom / YouTube Live)",
    meetingLink: "https://zoom.us/j/98765432101",
    category: "Banking & SSC",
    totalSeats: 500,
    registeredCount: 412,
    availableSeats: 88,
    status: "upcoming",
    recordingUrl: null,
    materialsProvided: ["Vedic Maths Speed Cheat Sheet", "Top 100 Repeated Arithmetic Formulas", "30-Day Mock Test Schedule"],
    targetAudience: "Any graduate preparing for SSC CGL, CHSL, IBPS PO, Clerk, SBI PO"
  },
  {
    id: "sem-time-mgmt-2026",
    title: "Time Management and Study Planning for Students",
    topic: "The 4-Quadrant Study Block System & Overcoming Procrastination",
    description: "Struggling to find time between college lectures, assignments, and exam prep? Learn psychological techniques such as Pomodoro time-boxing, the 80/20 syllabus focus rule, and digital distraction shielding.",
    mode: "Online",
    speaker: {
      name: "Prof. Rajesh Verma",
      designation: "Cognitive Psychologist & Student Success Coach",
      bio: "Author of 'Peak Study Performance'; conducted 150+ academic productivity workshops across universities.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    date: "2026-11-02",
    time: "6:30 PM - 8:00 PM IST",
    venue: "Google Meet Video Conference",
    meetingLink: "https://meet.google.com/timemgmt-students-2026",
    category: "General Strategy",
    totalSeats: 300,
    registeredCount: 265,
    availableSeats: 35,
    status: "upcoming",
    recordingUrl: null,
    materialsProvided: ["Printable Weekly Habit & Study Tracker", "Focus Audio Tracks for Deep Study"],
    targetAudience: "All competitive exam aspirants & college students"
  },
  {
    id: "sem-defence-career-2026",
    title: "Career Guidance by Successful Defence Candidates",
    topic: "Cracking CDS, AFCAT & Mastering the 5-Day SSB Interview",
    description: "An inspiring in-person seminar featuring serving and newly commissioned defence officers sharing their real ground journey through written tests, physical training, and the psychological SSB interview.",
    mode: "Offline",
    speaker: {
      name: "Capt. Vikram Rathore & Riya Sen",
      designation: "Indian Armed Forces Officers (CDS & AFCAT Qualified)",
      bio: "Cleared CDS & AFCAT in first attempt; passionate about youth defence guidance.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
    },
    date: "2026-11-08",
    time: "2:00 PM - 5:00 PM IST",
    venue: "Sardar Patel Memorial Seminar Hall, University Campus, Pune",
    meetingLink: null,
    category: "Defence",
    totalSeats: 150,
    registeredCount: 110,
    availableSeats: 40,
    status: "upcoming",
    recordingUrl: null,
    materialsProvided: ["SSB Officer Intelligence Rating (OIR) Practice Set", "PPDT Story Writing Template"],
    targetAudience: "Final year students and defence aspirants"
  },
  {
    id: "sem-post-grad-govt-2026",
    title: "How to Prepare for Government Exams After Graduation",
    topic: "Choosing the Right Exam, Budgeting Time & Securing Career Stability",
    description: "Fresh out of college or nearing graduation? Understand the hiring cycles, qualification perks, pension/salary benefits, and realistic timelines across Central & State government positions.",
    mode: "Hybrid",
    speaker: {
      name: "Suresh Menon",
      designation: "Senior Career Consultant & Former Staff Selection Advisor",
      bio: "Assisted over 20,000 university students in choosing matching competitive career paths.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
    },
    date: "2026-11-15",
    time: "11:00 AM - 1:30 PM IST",
    venue: "Conference Room B, City Library Hub, Deccan, Pune & Microsoft Teams",
    meetingLink: "https://teams.microsoft.com/l/meetup-join/govt-careers-2026",
    category: "Career Guidance",
    totalSeats: 200,
    registeredCount: 140,
    availableSeats: 60,
    status: "upcoming",
    recordingUrl: null,
    materialsProvided: ["Government Exam Selection Compass Flowchart", "State vs Central Pay Scales Reference 2026"],
    targetAudience: "Graduating students and job seekers"
  },
  {
    id: "sem-college-awareness-2026",
    title: "Competitive Exam Awareness for College Students",
    topic: "Building the Foundation from 1st and 2nd Year of Degree College",
    description: "Why wait until graduation? Discover how dedicating just 1-2 hours daily during college lays an unshakeable foundation for UPSC, State PSC, RRB, and Banking exams.",
    mode: "Offline",
    speaker: {
      name: "Suhas Patil, MPSC Deputy Collector",
      designation: "Maharashtra Civil Services Rank 8",
      bio: "Cleared MPSC in college final year; advocate for early civic awareness and youth leadership.",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80"
    },
    date: "2026-09-20",
    time: "10:00 AM - 1:00 PM IST",
    venue: "Dr. B.R. Ambedkar Auditorium, Pune",
    meetingLink: null,
    category: "General Strategy",
    totalSeats: 300,
    registeredCount: 300,
    availableSeats: 0,
    status: "completed",
    recordingUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Representative recording
    materialsProvided: ["College-to-Officer 3-Year Blueprint", "Recommended Monthly Reading List"],
    targetAudience: "1st and 2nd Year degree college students"
  },
  {
    id: "sem-gate-psu-completed",
    title: "Cracking GATE & PSU Job Opportunities for Engineers",
    topic: "Engineering Discipline Deep-dive & PSU Selection Criteria",
    description: "High-scoring strategies for core engineering branches, conceptual problem solving, and leveraging GATE score for direct PSU appointments.",
    mode: "Online",
    speaker: {
      name: "Anand Joshi",
      designation: "AIR 14 (GATE) & Executive Engineer at ONGC",
      bio: "99.9 percentile in GATE; guides mechanical and electrical engineers on high-yield topics.",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
    },
    date: "2026-09-12",
    time: "4:00 PM - 6:30 PM IST",
    venue: "Webinar Recording Available",
    meetingLink: null,
    category: "Engineering & GATE",
    totalSeats: 400,
    registeredCount: 395,
    availableSeats: 0,
    status: "completed",
    recordingUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    materialsProvided: ["GATE High-Yield Formula Sheet", "PSU Cut-Off Trend Analysis"],
    targetAudience: "Engineering students and aspirants"
  }
];

export const PREPARATION_STRATEGIES = [
  {
    id: "strat-exam-specific",
    title: "Exam-Specific Preparation Blueprints",
    category: "Exam Strategies",
    icon: "Target",
    summary: "Tailored preparation workflows for UPSC, SSC, Banking, Railways, and GATE.",
    points: [
      {
        exam: "UPSC & State PSC",
        steps: [
          "Start with NCERTs (Class 6-12) to build conceptual clarity before touching standard reference books.",
          "Limit resources to 1 standard book per subject; prioritize 5-10 revisions over reading 10 different books.",
          "Daily newspaper reading (The Hindu or Indian Express) accompanied by syllabus-mapped note making.",
          "Dedicate 4-5 months strictly to answer writing practice for GS 1-4 and Optional subject before Prelims."
        ]
      },
      {
        exam: "Banking (IBPS / SBI PO & Clerk)",
        steps: [
          "Master mental arithmetic (squares up to 50, cubes to 30, percentage-to-fraction conversions).",
          "Practice 4-5 puzzles and seating arrangements daily to build pattern recognition.",
          "Read English editorials daily to improve reading speed and comprehension ability.",
          "Take at least 2 full-length sectional speed tests every week with thorough error logs."
        ]
      },
      {
        exam: "SSC CGL / CHSL",
        steps: [
          "Complete core arithmetic and advanced math (geometry, trigonometry, algebra) theory first.",
          "Solve previous 5 years' question papers chapter-wise; SSC repeats question patterns frequently.",
          "Keep computer awareness notes handy as it is qualifying in Tier-2.",
          "Practice 15-minute English cloze test & error spotting sets daily."
        ]
      },
      {
        exam: "Railways RRB NTPC / Group D",
        steps: [
          "Focus on Class 9 and 10 NCERT Science (Physics, Chemistry, Life Sciences) which carries heavy weight.",
          "Practice high-accuracy calculations for arithmetic to secure cutoff margins.",
          "Revise current events and Indian Railways facts from past 12 months."
        ]
      }
    ]
  },
  {
    id: "strat-study-plans",
    title: "Daily and Weekly Study Timetables",
    category: "Planning",
    icon: "Calendar",
    summary: "Scientifically structured routines designed for full-time aspirants and college-going students.",
    points: [
      {
        exam: "Full-Time Aspirant Blueprint (8 Hours / Day)",
        steps: [
          "06:30 AM - 08:30 AM: Slot 1 - Heavy Conceptual Topic (Polity / Economy / Advanced Math)",
          "09:30 AM - 11:30 AM: Slot 2 - Current Affairs & Newspaper Analysis + Flashcards",
          "01:30 PM - 03:30 PM: Slot 3 - Practice Questions / MCQs / Answer Writing",
          "04:30 PM - 06:30 PM: Slot 4 - Secondary Subject (History / Geography / Reasoning)",
          "08:00 PM - 09:30 PM: Slot 5 - Spaced Revision of the Day's Notes & Next Day Planning"
        ]
      },
      {
        exam: "College Student Routine (3 - 4 Hours / Day)",
        steps: [
          "06:00 AM - 07:30 AM: Morning focus block before college (core theory study)",
          "Commute / Free lecture gaps: Read digital editorial summary or solve 20 reasoning questions on mobile",
          "07:00 PM - 08:30 PM: Practice solving previous year questions (PYQs)",
          "09:30 PM - 10:30 PM: Daily current affairs recap and quick revision",
          "Weekends (Saturday & Sunday): 6-8 hour marathon blocks for mock exams and backlog clearance"
        ]
      }
    ]
  },
  {
    id: "strat-time-mgmt",
    title: "Proven Time-Management Techniques",
    category: "Productivity",
    icon: "Clock",
    summary: "Methods to eliminate fatigue, avoid burnout, and maximize retention per hour.",
    points: [
      {
        exam: "Techniques",
        steps: [
          "Pomodoro 50/10 Rule: 50 minutes of deep distraction-free study followed by a strict 10-minute screen-free break.",
          "Eisenhower Matrix: Prioritize tasks by Urgent vs Important. Spend 70% of study time in 'Important but Not Urgent' (concept building & revision).",
          "Time-Boxing: Schedule exact calendar appointments for each subject rather than maintaining a generic to-do list.",
          "Digital Detox: Put phones in another room or use website blockers during active study sessions."
        ]
      }
    ]
  },
  {
    id: "strat-mock-tests",
    title: "Mock Test & Previous-Year Paper Guidance",
    category: "Testing",
    icon: "CheckSquare",
    summary: "How to use mock exams as diagnostic learning instruments rather than mere score cards.",
    points: [
      {
        exam: "Testing Methodology",
        steps: [
          "The 1:2 Ratio: For every 1 hour spent writing a mock test, spend 2 hours analyzing errors.",
          "Create a dedicated 'Mistake Notebook' categorizing errors into: Conceptual Lack, Calculation Blunder, or Misreading Question.",
          "Simulate real exam hours (e.g. 9:30 AM to 11:30 AM) to condition your biological clock.",
          "Solve at least 15-20 full-length previous year papers from the last 10 years before touching randomized test series."
        ]
      }
    ]
  },
  {
    id: "strat-revision-methods",
    title: "Scientific Revision Methods",
    category: "Memory",
    icon: "Brain",
    summary: "Defeating the Ebbinghaus Forgetting Curve using active recall and spaced intervals.",
    points: [
      {
        exam: "Spaced Repetition Protocol (1-3-7-30 Rule)",
        steps: [
          "Day 1: First revision within 24 hours of reading a new chapter (15 minutes summary review).",
          "Day 3: Second revision - solve 10 questions without referring to notes.",
          "Day 7: Third revision - explain key concepts out loud using the Feynman Technique.",
          "Day 30: Fourth revision - rapid glance through mind maps and condensed 1-page notes."
        ]
      }
    ]
  },
  {
    id: "strat-mistakes-to-avoid",
    title: "Top Mistakes to Avoid in Competitive Exams",
    category: "Warnings",
    icon: "AlertTriangle",
    summary: "Common pitfalls that cause 90% of candidates to lose crucial marks or drop attempts.",
    points: [
      {
        exam: "Frequent Pitfalls",
        steps: [
          "Book Hoarding: Buying dozens of study materials and reading none thoroughly.",
          "Neglecting Test Series: Delaying mock tests until 'syllabus is 100% complete' (syllabus is never 100% complete).",
          "Ignoring the Official Syllabus: Studying random trivia not aligned with conducting commission guidelines.",
          "Over-answering in Negative Marking: Random guessing leading to negative deductions that destroy ranks.",
          "Burnout & Sleep Deprivation: Sacrificing sleep before the exam day impairs analytical cognition by up to 40%."
        ]
      }
    ]
  }
];

export const INITIAL_ANNOUNCEMENTS = [
  {
    id: "ann-1",
    title: "Registration Open for Free UPSC & State PSC Strategy Seminar",
    content: "Seats are filling up rapidly for our flagship offline and online guidance seminar by Dr. Arvind Sharma on Oct 25th. Register now to reserve your seat and receive free micro-syllabus PDFs.",
    date: "2026-10-14",
    type: "seminar",
    badge: "Important",
    link: "/seminars"
  },
  {
    id: "ann-2",
    title: "UPSC Civil Services 2026 Annual Calendar Tentative Alert",
    content: "UPSC has released the tentative notification date schedule for the 2026 examination cycle. Prelims examination is scheduled for late May 2026. Aspirants should start their revision cycles now.",
    date: "2026-10-12",
    type: "exam",
    badge: "Official Update",
    link: "/exams/upsc-cse"
  },
  {
    id: "ann-3",
    title: "New Feature: Interactive Study Planner with Daily Goal Tracking",
    content: "You can now customize your daily study tasks, set duration targets, and monitor your weekly preparation consistency right from your dashboard.",
    date: "2026-10-10",
    type: "platform",
    badge: "New Feature",
    link: "/planner"
  }
];

export const INITIAL_TASKS = [
  {
    id: "task-1",
    title: "Revise Indian Constitution Fundamental Rights & DPSPs",
    subject: "Polity",
    duration: 90, // minutes
    deadline: "2026-10-14",
    priority: "High",
    completed: true,
    completedAt: "2026-10-14T09:30:00Z"
  },
  {
    id: "task-2",
    title: "Solve 25 Quantitative Aptitude Problems (Percentages & Profit/Loss)",
    subject: "Maths / CSAT",
    duration: 60,
    deadline: "2026-10-14",
    priority: "High",
    completed: false,
    completedAt: null
  },
  {
    id: "task-3",
    title: "Read The Hindu Editorial & make 5 bullet-point notes",
    subject: "Current Affairs",
    duration: 45,
    deadline: "2026-10-14",
    priority: "Medium",
    completed: false,
    completedAt: null
  },
  {
    id: "task-4",
    title: "Take Banking Reasoning Mock Test 03 and analyze mistakes",
    subject: "Reasoning",
    duration: 75,
    deadline: "2026-10-15",
    priority: "Medium",
    completed: false,
    completedAt: null
  }
];
