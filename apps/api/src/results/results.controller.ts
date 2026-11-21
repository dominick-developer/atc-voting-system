import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

const RESULTS = [
  {
    positionId: "pos-president",
    positionTitle: "President",
    totalVotes: 2997,
    winner: "c1",
    candidates: [
      { candidateId: "c1", name: "Jane Mwangi",  initials: "JM", color: "from-orange-500 to-red-600",    votes: 1284 },
      { candidateId: "c2", name: "David Kimaro", initials: "DK", color: "from-emerald-500 to-teal-600",  votes: 962 },
      { candidateId: "c3", name: "Grace Mushi",  initials: "GM", color: "from-blue-500 to-indigo-600",   votes: 751 },
    ],
  },
  {
    positionId: "pos-vp",
    positionTitle: "Vice President",
    totalVotes: 2931,
    winner: "c4",
    candidates: [
      { candidateId: "c4", name: "Peter Msigwa",  initials: "PM", color: "from-purple-500 to-pink-600",   votes: 1521 },
      { candidateId: "c5", name: "Rehema Joseph", initials: "RJ", color: "from-amber-500 to-orange-600", votes: 1410 },
    ],
  },
];

@Controller("results")
export class ResultsController {
  @Get()
  list() {
    return RESULTS;
  }
}