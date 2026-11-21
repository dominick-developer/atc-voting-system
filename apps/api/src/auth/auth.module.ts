import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./jwt.strategy";
import { PrismaModule } from "../common/prisma/prisma.module";
import { IntegrationsModule } from "../modules/integrations/integrations.module";

@Module({
  imports: [
    PrismaModule,
    IntegrationsModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET || "dev-secret-change-me-in-production",
      signOptions: { expiresIn: process.env.JWT_ACCESS_TTL || "24h" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
