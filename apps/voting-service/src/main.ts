import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import helmet from "helmet";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const config = app.get(ConfigService);

  app.setGlobalPrefix("api");
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const swagger = new DocumentBuilder()
    .setTitle("ATC Voting Service API (ISOLATED)")
    .setDescription("Anonymous ballots · credentials · tally. Separate credentials from core API.")
    .setVersion("0.1.0")
    .build();
  SwaggerModule.setup("api/docs", app, SwaggerModule.createDocument(app, swagger));

  const port = config.get<number>("PORT") ?? 4100;
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`🗳️  Voting Service on http://localhost:${port}/api`);
}
bootstrap();
