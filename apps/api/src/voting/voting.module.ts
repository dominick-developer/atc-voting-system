import { Module } from "@nestjs/common";
import { BallotsService } from "./ballots.service";
import { BallotsController } from "./ballots.controller";
import { TallyController } from "./tally.controller";

@Module({
  controllers: [BallotsController, TallyController],
  providers: [BallotsService],
  exports: [BallotsService],
})
export class VotingModule {}