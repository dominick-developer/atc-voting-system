export const currentStudent = {
  id: "1",
  fullName: "John Doe",
  admissionNumber: "ATC/2024/0001",
  programme: "Computer Science",
  class: "NTA Level 5 - CS",
  yearOfBirth: "2003",
  verified: true,
};

export const activeElections = [
  {
    id: "soateco-2026",
    title: "SOATECO General Election",
    category: "GENERAL",
    status: "VOTING_OPEN",
    votingEndsAt: new Date(Date.now() + 1000 * 60 * 60 * 36).toISOString(),
    positions: 6,
    candidates: 24,
    hasVoted: false,
  },
  {
    id: "class-cs-5",
    title: "Class Representative (CS NTA 5)",
    category: "CLASS",
    status: "UPCOMING",
    votingEndsAt: new Date(Date.now() + 1000 * 60 * 60 * 72).toISOString(),
    positions: 3,
    candidates: 9,
    hasVoted: false,
  },
];

export const studentStats = {
  activeElections: 2,
  upcomingElections: 1,
  votesSubmitted: 0,
  completedElections: 4,
};

export const commissionStats = {
  totalStudents: 3842,
  eligibleVoters: 3756,
  registeredCandidates: 87,
  activeElections: 2,
  activeStations: 6,
  activeTerminals: 54,
  pendingNominations: 12,
  pendingComplaints: 3,
};

export const recentAudit = [
  { id: 1, event: "Election opened: SOATECO General",            actor: "Electoral Commission", time: "2 min ago" },
  { id: 2, event: "Candidate approved: Jane Mwangi (President)", actor: "Electoral Commission", time: "18 min ago" },
  { id: 3, event: "Voter register approved (3,756 voters)",      actor: "Electoral Commission", time: "1 hr ago" },
  { id: 4, event: "Station activated: Main Hall - Station A",    actor: "Election Officer",     time: "2 hr ago" },
  { id: 5, event: "CSV import completed (128 new students)",     actor: "System Admin",         time: "3 hr ago" },
];

export type Position = {
  id: string;
  electionId: string;
  title: string;
  description: string;
  maxSelections: number;
};

export const positions: Position[] = [
  { id: "pos-president", electionId: "soateco-2026", title: "President",        description: "Leads SOATECO and represents all students.",        maxSelections: 1 },
  { id: "pos-vp",        electionId: "soateco-2026", title: "Vice President",   description: "Supports the President and oversees committees.",   maxSelections: 1 },
  { id: "pos-secretary", electionId: "soateco-2026", title: "General Secretary",description: "Manages records and communication.",                maxSelections: 1 },
  { id: "pos-treasurer", electionId: "soateco-2026", title: "Treasurer",        description: "Oversees finances and budgets.",                    maxSelections: 1 },
];

export type Candidate = {
  id: string;
  positionId: string;
  electionId: string;
  name: string;
  programme: string;
  ntaLevel: string;
  manifesto: string;
  initials: string;
  color: string;
};

export const candidates: Candidate[] = [
  { id: "c1", positionId: "pos-president", electionId: "soateco-2026", name: "Jane Mwangi",    programme: "Electrical Engineering", ntaLevel: "NTA 6", manifesto: "A transparent SOATECO that listens. Monthly open forums, published budgets, and real action on student welfare.", initials: "JM", color: "from-orange-500 to-red-600" },
  { id: "c2", positionId: "pos-president", electionId: "soateco-2026", name: "David Kimaro",   programme: "Computer Science",       ntaLevel: "NTA 5", manifesto: "Digital-first student services. Every complaint tracked, every promise measured. Let us modernize SOATECO together.", initials: "DK", color: "from-emerald-500 to-teal-600" },
  { id: "c3", positionId: "pos-president", electionId: "soateco-2026", name: "Grace Mushi",    programme: "Civil Engineering",      ntaLevel: "NTA 6", manifesto: "Bridging students and administration. More study spaces, faster results, and better hostel conditions.", initials: "GM", color: "from-blue-500 to-indigo-600" },
  { id: "c4", positionId: "pos-vp",        electionId: "soateco-2026", name: "Peter Msigwa",   programme: "Mechanical Engineering", ntaLevel: "NTA 6", manifesto: "Stronger clubs, better sports, and a more connected campus.", initials: "PM", color: "from-purple-500 to-pink-600" },
  { id: "c5", positionId: "pos-vp",        electionId: "soateco-2026", name: "Rehema Joseph",  programme: "Laboratory Technology",  ntaLevel: "NTA 5", manifesto: "I will champion mental health support and inclusive activities for all students.", initials: "RJ", color: "from-amber-500 to-orange-600" },
  { id: "c6", positionId: "pos-secretary", electionId: "soateco-2026", name: "Michael Ndosi",  programme: "Computer Science",       ntaLevel: "NTA 6", manifesto: "Every meeting documented. Every decision shared. Every student informed.", initials: "MN", color: "from-slate-600 to-slate-800" },
  { id: "c7", positionId: "pos-secretary", electionId: "soateco-2026", name: "Sarah Materu",   programme: "Electrical Engineering", ntaLevel: "NTA 5", manifesto: "Clear communication through modern channels — WhatsApp, email and a real student newsletter.", initials: "SM", color: "from-teal-500 to-cyan-600" },
  { id: "c8", positionId: "pos-treasurer", electionId: "soateco-2026", name: "Emmanuel Shayo", programme: "Civil Engineering",      ntaLevel: "NTA 6", manifesto: "Every shilling accounted for. Quarterly audited reports published to all students.", initials: "ES", color: "from-lime-500 to-emerald-600" },
];

export const declaredResults = [
  {
    positionId: "pos-president",
    positionTitle: "President",
    candidates: [
      { candidateId: "c1", name: "Jane Mwangi",  initials: "JM", color: "from-orange-500 to-red-600",     votes: 1284 },
      { candidateId: "c2", name: "David Kimaro", initials: "DK", color: "from-emerald-500 to-teal-600",  votes: 962 },
      { candidateId: "c3", name: "Grace Mushi",  initials: "GM", color: "from-blue-500 to-indigo-600",   votes: 751 },
    ],
    totalVotes: 2997,
    winner: "c1",
  },
  {
    positionId: "pos-vp",
    positionTitle: "Vice President",
    candidates: [
      { candidateId: "c4", name: "Peter Msigwa",  initials: "PM", color: "from-purple-500 to-pink-600",   votes: 1521 },
      { candidateId: "c5", name: "Rehema Joseph", initials: "RJ", color: "from-amber-500 to-orange-600", votes: 1410 },
    ],
    totalVotes: 2931,
    winner: "c4",
  },
];

export const notifications = [
  { id: "n1", title: "SOATECO voting is now open",         body: "Cast your vote before Friday 5:00 PM.",                                  time: "10 min ago", read: false },
  { id: "n2", title: "New candidate profile published",    body: "Jane Mwangi has published her campaign manifesto.",                       time: "2 hr ago",   read: false },
  { id: "n3", title: "Your vote was accepted",             body: "Your ballot for SOATECO 2025 has been recorded anonymously.",             time: "1 day ago",  read: true },
  { id: "n4", title: "Class election results declared",    body: "Results for CS NTA 5 Class Representative are now public.",               time: "3 days ago", read: true },
];

export const complaints = [
  { id: "CP-2026-001", category: "Voter eligibility", subject: "My name is missing from the register", status: "UNDER_REVIEW", date: "2 days ago" },
  { id: "CP-2026-002", category: "Technical issue",   subject: "Could not verify phone number",       status: "RESOLVED",     date: "5 days ago" },
];