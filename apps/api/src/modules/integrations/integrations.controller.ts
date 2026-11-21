import { Controller, Get } from "@nestjs/common";
import { AtcApiService } from "./atc-api.service";

@Controller("integrations")
export class IntegrationsController {
  constructor(private readonly atc: AtcApiService) {}
  @Get("health")
  health() {
    return { status: "ok", atcMode: this.atc.mode, timestamp: new Date().toISOString() };
  }
}
