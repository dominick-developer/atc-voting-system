import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

const CANDIDATES = [
  { id: "c1", electionId: "soateco-2026", positionId: "pos-president", name: "Jane Mwangi",  programme: "Electrical Engineering", ntaLevel: "NTA 6", initials: "JM", color: "from-orange-500 to-red-600",    manifesto: "A transparent SOATECO that listens. Monthly open forums, published budgets, and real action on student welfare." },
  { id: "c2", electionId: "soateco-2026", positionId: "pos-president", name: "David Kimaro", programme: "Computer Science",       ntaLevel: "NTA 5", initials: "DK", color: "from-emerald-500 to-teal-600",  manifesto: "Digital-first student services. Every complaint tracked, every promise measured. Let us modernize SOATECO together." },
  { id: "c3", electionId: "soateco-2026", positionId: "pos-president", name: "Grace Mushi",  programme: "Civil Engineering",      ntaLevel: "NTA 6", initials: "GM", color: "from-blue-500 to-indigo-600",   manifesto: "Bridging students and administration. More study spaces, faster results, and better hostel conditions." },
  { id: "c4", electionId: "soateco-2026", positionId: "pos-vp",        name: "Peter Msigwa", programme: "Mechanical Engineering", ntaLevel: "NTA 6", initials: "PM", color: "from-purple-500 to-pink-600",   manifesto: "Stronger clubs, better sports, and a more connected campus." },
  { id: "c5", electionId: "soateco-2026", positionId: "pos-vp",        name: "Rehema Joseph",programme: "Laboratory Technology",  ntaLevel: "NTA 5", initials: "RJ", color: "from-amber-500 to-orange-600",  manifesto: "I will champion mental health support and inclusive activities for all students." },
  { id: "c6", electionId: "soateco-2026", positionId: "pos-secretary", name: "Michael Ndosi",programme: "Computer Science",       ntaLevel: "NTA 6", initials: "MN", color: "from-slate-600 to-slate-800",   manifesto: "Every meeting documented. Every decision shared. Every student informed." },
  { id: "c7", electionId: "soateco-2026", positionId: "pos-secretary", name: "Sarah Materu", programme: "Electrical Engineering", ntaLevel: "NTA 5", initials: "SM", color: "from-teal-500 to-cyan-600",     manifesto: "Clear communication through modern channels — WhatsApp, email and a real student newsletter." },
  { id: "c8", electionId: "soateco-2026", positionId: "pos-treasurer", name: "Emmanuel Shayo",programme: "Civil Engineering",     ntaLevel: "NTA 6", initials: "ES", color: "from-lime-500 to-emerald-600",  manifesto: "Every shilling accounted for. Quarterly audited reports published to all students." },
];

@UseGuards(AuthGuard("jwt"))
@Controller("candidates")
export class CandidatesController {
  @Get()
  list() {
    return CANDIDATES;
  }
}