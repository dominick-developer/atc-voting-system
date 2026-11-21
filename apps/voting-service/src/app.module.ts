import { Controller, Get, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

@Controller("health")
class HealthController {
  @Get()
  check() {
    return { status: "ok", service: "atc-voting-service", timestamp: new Date().toISOString() };
  }
}

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: [".env", "../../.env"] })],
  controllers: [HealthController],
})
export class AppModule {}
