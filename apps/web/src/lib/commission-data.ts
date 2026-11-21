// Commission-specific mock data
export type CommissionElection = {
  id: string;
  title: string;
  category: "GENERAL" | "CLASS";
  status: "DRAFT" | "NOMINATION_OPEN" | "READY" | "VOTING_OPEN" | "VOTING_CLOSED" | "DECLARED";
  eligibleVoters: number;
  candidates: number;
  positions: number;
  startsAt: string;
  endsAt: string;
};

export const commissionElections: CommissionElection[] = [
  { id: "soateco-2026", title: "SOATECO General Election 2026", category: "GENERAL", status: "VOTING_OPEN",   eligibleVoters: 3756, candidates: 24, positions: 6, startsAt: "2026-02-20T08:00:00Z", endsAt: "2026-02-22T17:00:00Z" },
  { id: "class-cs-5",   title: "Class Rep — CS NTA 5",            category: "CLASS",   status: "READY",         eligibleVoters: 142,  candidates: 9,  positions: 3, startsAt: "2026-02-25T08:00:00Z", endsAt: "2026-02-25T17:00:00Z" },
  { id: "class-ee-6",   title: "Class Rep — EE NTA 6",            category: "CLASS",   status: "NOMINATION_OPEN", eligibleVoters: 98, candidates: 4, positions: 3, startsAt: "2026-02-26T08:00:00Z", endsAt: "2026-02-26T17:00:00Z" },
];

export type PendingNomination = {
  id: string;
  studentName: string;
  admissionNo: string;
  position: string;
  submittedAt: string;
  status: "SUBMITTED" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";
};

export const pendingNominations: PendingNomination[] = [
  { id: "N-001", studentName: "Alice Mwakalinga", admissionNo: "ATC/2024/0128", position: "President",         submittedAt: "2 hr ago",  status: "SUBMITTED" },
  { id: "N-002", studentName: "Brian Mrema",      admissionNo: "ATC/2024/0345", position: "General Secretary", submittedAt: "4 hr ago",  status: "SUBMITTED" },
  { id: "N-003", studentName: "Catherine Bura",   admissionNo: "ATC/2024/0219", position: "Treasurer",         submittedAt: "6 hr ago",  status: "UNDER_REVIEW" },
  { id: "N-004", studentName: "Daudi Mwakyusa",   admissionNo: "ATC/2024/0098", position: "Vice President",    submittedAt: "1 day ago", status: "SUBMITTED" },
  { id: "N-005", studentName: "Ester Laizer",     admissionNo: "ATC/2024/0456", position: "President",         submittedAt: "1 day ago", status: "UNDER_REVIEW" },
];

export type Terminal = {
  id: string;
  station: string;
  status: "ONLINE" | "OFFLINE" | "MAINTENANCE";
  votesCast: number;
};

export const terminals: Terminal[] = [
  { id: "T-001", station: "Main Hall — A", status: "ONLINE",      votesCast: 128 },
  { id: "T-002", station: "Main Hall — B", status: "ONLINE",      votesCast: 145 },
  { id: "T-003", station: "Library — A",   status: "ONLINE",      votesCast: 92 },
  { id: "T-004", station: "Library — B",   status: "OFFLINE",     votesCast: 0 },
  { id: "T-005", station: "Lab 1 — A",     status: "ONLINE",      votesCast: 76 },
  { id: "T-006", station: "Lab 1 — B",     status: "MAINTENANCE", votesCast: 0 },
  { id: "T-007", station: "Admin Block",   status: "ONLINE",      votesCast: 88 },
  { id: "T-008", station: "Engineering",   status: "ONLINE",      votesCast: 103 },
];

export type CommissionComplaint = {
  id: string;
  submittedBy: string;
  category: string;
  subject: string;
  status: "SUBMITTED" | "UNDER_REVIEW" | "RESOLVED" | "REJECTED";
  date: string;
};

export const allComplaints: CommissionComplaint[] = [
  { id: "CP-2026-001", submittedBy: "John Doe",      category: "Voter eligibility",   subject: "My name is missing from the register",  status: "UNDER_REVIEW", date: "2 days ago" },
  { id: "CP-2026-002", submittedBy: "Mary Komba",    category: "Technical issue",     subject: "Could not verify phone number",          status: "RESOLVED",     date: "5 days ago" },
  { id: "CP-2026-003", submittedBy: "Ali Hassan",    category: "Election misconduct", subject: "Candidate campaigning outside period",    status: "UNDER_REVIEW", date: "1 day ago"  },
  { id: "CP-2026-004", submittedBy: "Rose Mwinyi",   category: "Candidate nomination",subject: "Nomination rejected without reason",       status: "SUBMITTED",    date: "6 hr ago"   },
];

export type ImportJob = {
  id: string;
  fileName: string;
  uploadedBy: string;
  rows: number;
  valid: number;
  errors: number;
  status: "COMPLETED" | "FAILED" | "IN_PROGRESS";
  date: string;
};

export const importJobs: ImportJob[] = [
  { id: "IMP-001", fileName: "students_jan_2026.xlsx", uploadedBy: "System Admin", rows: 428, valid: 421, errors: 7, status: "COMPLETED",   date: "3 days ago" },
  { id: "IMP-002", fileName: "students_feb_2026.xlsx", uploadedBy: "System Admin", rows: 312, valid: 312, errors: 0, status: "COMPLETED",   date: "1 day ago"  },
  { id: "IMP-003", fileName: "cs_nta5_update.csv",     uploadedBy: "Registrar",    rows: 142, valid: 0,   errors: 0, status: "IN_PROGRESS", date: "10 min ago" },
  { id: "IMP-004", fileName: "ee_nta6_new.csv",        uploadedBy: "Registrar",    rows: 98,  valid: 0,   errors: 18, status: "FAILED",     date: "2 days ago" },
];

export type AuditEvent = {
  id: string;
  event: string;
  actor: string;
  electionId?: string;
  hash: string;
  time: string;
};

export const auditEvents: AuditEvent[] = [
  { id: "AE-1042", event: "Election opened: SOATECO General",        actor: "Electoral Commission", electionId: "soateco-2026", hash: "0x9f3a…d21b", time: "2 min ago" },
  { id: "AE-1041", event: "Candidate approved: Jane Mwangi",         actor: "Electoral Commission", electionId: "soateco-2026", hash: "0x7b8e…4c02", time: "18 min ago" },
  { id: "AE-1040", event: "Voter register frozen (3,756 voters)",    actor: "Electoral Commission", electionId: "soateco-2026", hash: "0xa2d5…88f1", time: "1 hr ago" },
  { id: "AE-1039", event: "Station registered: Main Hall — Station A", actor: "Election Officer",  electionId: "soateco-2026", hash: "0xc1e9…5a3d", time: "2 hr ago" },
  { id: "AE-1038", event: "CSV import completed (128 students)",      actor: "System Admin",                                 hash: "0x4f7b…9e0c", time: "3 hr ago" },
  { id: "AE-1037", event: "Ballot rejected: duplicate credential",    actor: "Voting Service",      electionId: "soateco-2026", hash: "0x8d1a…27b6", time: "4 hr ago" },
  { id: "AE-1036", event: "Election created: CS NTA 5 Class Rep",     actor: "Electoral Commission", electionId: "class-cs-5",   hash: "0x5e3f…b8d4", time: "1 day ago" },
];

export const commissionOverview = {
  eligibleVoters: 3756,
  totalStudents: 3842,
  registeredCandidates: 87,
  activeElections: 2,
  activeTerminals: 6,
  totalTerminals: 8,
  pendingNominations: 5,
  pendingComplaints: 3,
  totalVotesCast: 632,
  turnoutPct: 16.8,
};