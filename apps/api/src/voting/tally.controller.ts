import { Controller, Get, Param } from "@nestjs/common";
import { BallotsService } from "./ballots.service";

@Controller("tally")
export class TallyController {
  constructor(private readonly ballots: BallotsService) {}

  @Get(":electionId")
  tally(@Param("electionId") electionId: string) {
    return this.ballots.tally(electionId);
  }
}