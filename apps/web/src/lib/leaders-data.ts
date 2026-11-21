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
};

export const leaders: Leader[] = [
  {
    id: "l1",
    name: "Amina Mwakalinga",
    position: "President",
    term: "2025 / 2026",
    programme: "Electrical Engineering",
    year: "NTA Level 6",
    initials: "AM",
    gradient: "from-[#F47721] to-[#e6670f]",
    achievement: "Led the successful push for 24-hour library access and a new student welfare fund.",
    email: "president@soateco.atc.ac.tz",
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
    achievement: "Championed the campus sports revival and launched the first inter-department tournament.",
    email: "vp@soateco.atc.ac.tz",
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
    achievement: "Digitized SOATECO records and introduced the first public weekly meeting minutes.",
    email: "secretary@soateco.atc.ac.tz",
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
    achievement: "Published quarterly audited budgets for the first time in SOATECO history.",
    email: "treasurer@soateco.atc.ac.tz",
  },
];