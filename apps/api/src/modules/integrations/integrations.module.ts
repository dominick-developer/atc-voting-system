import { Module } from "@nestjs/common";
import { AtcApiService } from "./atc-api.service";
import { IntegrationsController } from "./integrations.controller";

@Module({
  controllers: [IntegrationsController],
  providers: [AtcApiService],
  exports: [AtcApiService],
})
export class IntegrationsModule {}
