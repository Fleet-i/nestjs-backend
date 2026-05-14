import { NestFactory } from '@nestjs/core';
import { BookingAppModule } from './booking-app.module';

async function bootstrap() {
  const app = await NestFactory.create(BookingAppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
