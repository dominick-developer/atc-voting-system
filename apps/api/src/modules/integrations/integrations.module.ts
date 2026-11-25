// apps/api/src/modules/integrations/integrations.module.ts
import { Module } from "@nestjs/common";
import { IntegrationsController } from "./integrations.controller";
import { IntegrationsService } from "./integrations.service";
import { CryptoService } from "@/common/crypto/crypto.service";
import { PrismaService } from "@/common/prisma/prisma.service";

@Module({
  controllers: [IntegrationsController],
  providers: [IntegrationsService, CryptoService, PrismaService],
  exports: [IntegrationsService],
})
export class IntegrationsModule { }
