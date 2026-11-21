import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { BallotsService } from "./ballots.service";
import { SubmitBallotDto } from "./dto/submit-ballot.dto";

@UseGuards(AuthGuard("jwt"))
@Controller("ballots")
export class BallotsController {
  constructor(private readonly ballots: BallotsService) {}

  @Post("submit")
  submit(@Req() req: any, @Body() dto: SubmitBallotDto) {
    return this.ballots.submit(dto.electionId, req.user.admissionNumber, dto.selections);
  }

  @Get("status/:electionId")
  status(@Req() req: any, @Param("electionId") electionId: string) {
    return {
      electionId,
      hasVoted: this.ballots.hasVoted(electionId, req.user.admissionNumber),
    };
  }
}