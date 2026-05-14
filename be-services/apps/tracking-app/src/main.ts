import { NestFactory } from '@nestjs/core';
import { TrackingAppModule } from './tracking-app.module';

async function bootstrap() {
  const app = await NestFactory.create(TrackingAppModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
