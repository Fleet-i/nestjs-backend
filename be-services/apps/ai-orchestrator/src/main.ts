import { NestFactory } from '@nestjs/core';
import { AiOrchestratorModule } from './ai-orchestrator.module';

async function bootstrap() {
  const app = await NestFactory.create(AiOrchestratorModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
