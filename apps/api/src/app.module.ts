import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import { HealthModule } from "./modules/health/health.module";
import { AuthModule } from "./auth/auth.module";
import { ElectionsController } from "./elections/elections.controller";
import { CandidatesController } from "./candidates/candidates.controller";
import { ResultsController } from "./results/results.controller";
import { VotingModule } from "./voting/voting.module";
import { PrismaModule } from "./common/prisma/prisma.module";
import { IntegrationsModule } from "./modules/integrations/integrations.module";
import { AdminModule } from "./modules/admin/admin.module";

@Module({
  imports: [
    PrismaModule,
    IntegrationsModule,
    AdminModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: [".env", "../../.env"] }),
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 100 }]),
    HealthModule,
    AuthModule,
    VotingModule,
  ],
  controllers: [
    ElectionsController,
    CandidatesController,
    ResultsController,
  ],
})
export class AppModule {}
