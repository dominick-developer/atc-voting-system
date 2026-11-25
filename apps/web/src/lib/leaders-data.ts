export type LeaderCategory = "soateco" | "class" | "candidates" | "past";

export type Leader = {
  id: string;
  name: string;
  position: string;
  term: string;
  programme: string;
  year: string;
  initials: string;
  gradient: string;
  achievement: string;
  email: string;
  category?: LeaderCategory; // default = "soateco" (backwards compatible)
};

export const leaders: Leader[] = [
  // ═════════════════════════════════════════════════════════════
  // SOATECO 2025/2026 — CURRENT LEADERS
  // ═════════════════════════════════════════════════════════════
  {
    id: "l1",
    name: "Amina Mwakalinga",
    position: "President",
    term: "2025 / 2026",
    programme: "Electrical Engineering",
    year: "NTA Level 6",
    initials: "AM",
    gradient: "from-[#F47721] to-[#e6670f]",
    achievement:
      "Led the successful push for 24-hour library access and a new student welfare fund.",
    email: "president@soateco.atc.ac.tz",
    category: "soateco",
  },
  {
    id: "l2",
    name: "Baraka Mwenda",
    position: "Vice President",
    term: "2025 / 2026",
    programme: "Civil Engineering",
    year: "NTA Level 6",
    initials: "BM",
    gradient: "from-[#16A36A] to-teal-600",
    achievement:
      "Championed the campus sports revival and launched the first inter-department tournament.",
    email: "vp@soateco.atc.ac.tz",
    category: "soateco",
  },
  {
    id: "l3",
    name: "Neema Kimaro",
    position: "General Secretary",
    term: "2025 / 2026",
    programme: "Computer Science",
    year: "NTA Level 5",
    initials: "NK",
    gradient: "from-[#1e40af] to-indigo-600",
    achievement:
      "Digitized SOATECO records and introduced the first public weekly meeting minutes.",
    email: "secretary@soateco.atc.ac.tz",
    category: "soateco",
  },
  {
    id: "l4",
    name: "Daniel Mushi",
    position: "Treasurer",
    term: "2025 / 2026",
    programme: "Mechanical Engineering",
    year: "NTA Level 6",
    initials: "DM",
    gradient: "from-[#7C3AED] to-purple-700",
    achievement:
      "Published quarterly audited budgets for the first time in SOATECO history.",
    email: "treasurer@soateco.atc.ac.tz",
    category: "soateco",
  },

  // ═════════════════════════════════════════════════════════════
  // CLASS LEADERS — SAMPLE DATA
  // (Badilisha na data halisi ya class elections)
  // ═════════════════════════════════════════════════════════════
  {
    id: "c1",
    name: "Joseph Mlekwa",
    position: "Class Representative · EE-6A",
    term: "2025 / 2026",
    programme: "Electrical Engineering",
    year: "NTA Level 6",
    initials: "JM",
    gradient: "from-teal-500 to-emerald-600",
    achievement:
      "Organized weekly peer tutoring sessions that improved class average by 12%.",
    email: "joseph.mlekwa@student.atc.ac.tz",
    category: "class",
  },
  {
    id: "c2",
    name: "Grace Nyambura",
    position: "Class Representative · CS-5B",
    term: "2025 / 2026",
    programme: "Computer Science",
    year: "NTA Level 5",
    initials: "GN",
    gradient: "from-pink-500 to-rose-600",
    achievement:
      "Started a coding club that now has 40+ active members meeting weekly.",
    email: "grace.nyambura@student.atc.ac.tz",
    category: "class",
  },
  {
    id: "c3",
    name: "Hamisi Juma",
    position: "Assistant Rep · ME-6A",
    term: "2025 / 2026",
    programme: "Mechanical Engineering",
    year: "NTA Level 6",
    initials: "HJ",
    gradient: "from-amber-500 to-orange-600",
    achievement:
      "Set up a class equipment-sharing system that saved students 30% on project costs.",
    email: "hamisi.juma@student.atc.ac.tz",
    category: "class",
  },

  // ═════════════════════════════════════════════════════════════
  // CANDIDATES 2026 — SAMPLE DATA
  // (Hii itakuwa dynamic kutoka database baadaye)
  // ═════════════════════════════════════════════════════════════
  {
    id: "g1",
    name: "Ibrahim Suleiman",
    position: "Candidate for President",
    term: "2026 Election",
    programme: "Civil Engineering",
    year: "NTA Level 6",
    initials: "IS",
    gradient: "from-violet-500 to-purple-700",
    achievement:
      "Manifesto focus: campus-wide WiFi expansion and free printing for students.",
    email: "ibrahim.suleiman@student.atc.ac.tz",
    category: "candidates",
  },
  {
    id: "g2",
    name: "Sofia Mwakasege",
    position: "Candidate for President",
    term: "2026 Election",
    programme: "Computer Science",
    year: "NTA Level 6",
    initials: "SM",
    gradient: "from-cyan-500 to-blue-600",
    achievement:
      "Manifesto focus: mental health support and 24-hour counseling services.",
    email: "sofia.mwakasege@student.atc.ac.tz",
    category: "candidates",
  },
  {
    id: "g3",
    name: "Peter Luvanda",
    position: "Candidate for Vice President",
    term: "2026 Election",
    programme: "Electrical Engineering",
    year: "NTA Level 6",
    initials: "PL",
    gradient: "from-emerald-500 to-teal-700",
    achievement:
      "Manifesto focus: industry attachment partnerships with 20+ companies.",
    email: "peter.luvanda@student.atc.ac.tz",
    category: "candidates",
  },

  // ═════════════════════════════════════════════════════════════
  // PAST LEADERS — SAMPLE DATA
  // (Archive of previous academic years)
  // ═════════════════════════════════════════════════════════════
  {
    id: "p1",
    name: "Sarah Joseph",
    position: "Former President",
    term: "2024 / 2025",
    programme: "Computer Science",
    year: "Graduated",
    initials: "SJ",
    gradient: "from-slate-500 to-slate-700",
    achievement:
      "Led the digitization of the student fee payment system and reduced payment queues by 80%.",
    email: "sarah.joseph@alumni.atc.ac.tz",
    category: "past",
  },
  {
    id: "p2",
    name: "Michael Mwakyusa",
    position: "Former Vice President",
    term: "2024 / 2025",
    programme: "Mechanical Engineering",
    year: "Graduated",
    initials: "MM",
    gradient: "from-stone-500 to-stone-700",
    achievement:
      "Established the first ATC alumni network connecting 200+ graduates with current students.",
    email: "michael.mwakyusa@alumni.atc.ac.tz",
    category: "past",
  },
];