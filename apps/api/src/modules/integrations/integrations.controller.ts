// apps/api/src/modules/integrations/integrations.controller.ts
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { RolesGuard } from "@/auth/guards/roles.guard";
import { Roles } from "@/auth/decorators/roles.decorator";
import { IntegrationsService, UpdateAtcDto } from "./integrations.service";

@Controller("settings/integrations/atc")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles("SYSTEM_ADMIN")
export class IntegrationsController {
  constructor(private svc: IntegrationsService) {}

  @Get()
  get() {
    return this.svc.getAtc();
  }

  @Put()
  update(@Body() dto: UpdateAtcDto, @Req() req: any) {
    return this.svc.updateAtc(dto, req.user?.id);
  }

  @Post("test")
  test(@Req() req: any) {
    return this.svc.testConnection(req.user?.id);
  }

  @Get("sync-logs")
  syncLogs() {
    return this.svc.recentSyncLogs();
  }
}