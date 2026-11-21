import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

const ELECTIONS = [
  {
    id: "soateco-2026",
    title: "SOATECO General Election",
    category: "GENERAL",
    status: "VOTING_OPEN",
    votingEndsAt: new Date(Date.now() + 1000 * 60 * 60 * 36).toISOString(),
    positions: 4,
    candidates: 8,
  },
  {
    id: "class-cs-5",
    title: "Class Representative (CS NTA 5)",
    category: "CLASS",
    status: "UPCOMING",
    votingEndsAt: new Date(Date.now() + 1000 * 60 * 60 * 72).toISOString(),
    positions: 3,
    candidates: 9,
  },
];

const POSITIONS = [
  { id: "pos-president", electionId: "soateco-2026", title: "President",         description: "Leads SOATECO and represents all students." },
  { id: "pos-vp",        electionId: "soateco-2026", title: "Vice President",    description: "Supports the President and oversees committees." },
  { id: "pos-secretary", electionId: "soateco-2026", title: "General Secretary", description: "Manages records and communication." },
  { id: "pos-treasurer", electionId: "soateco-2026", title: "Treasurer",         description: "Oversees finances and budgets." },
];

@UseGuards(AuthGuard("jwt"))
@Controller("elections")
export class ElectionsController {
  @Get()
  list() {
    return ELECTIONS;
  }

  @Get(":id")
  detail(@Param("id") id: string) {
    const e = ELECTIONS.find((x) => x.id === id);
    const positions = POSITIONS.filter((p) => p.electionId === id);
    return { ...e, positions };
  }
}