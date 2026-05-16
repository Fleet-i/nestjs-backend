import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import otelSDK from 'common/analytics/tracing';
//import { ValidationPipe } from '@nestjs/common';
import { ParseUUIDPipe } from 'common/pipes/string.pipe';
import { Logger } from 'nestjs-pino';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { BookingAppModule } from 'apps/booking-app/src/booking-app.module';
import { TrackingAppModule } from 'apps/tracking-app/src/tracking-app.module';
import { AiOrchestratorModule } from 'apps/ai-orchestrator/src/ai-orchestrator.module';

async function bootstrap() {
  // Start SDK before nestjs factory create
  await otelSDK.start();

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ParseUUIDPipe())
  //app.useLogger(app.get(Logger));
  // app.useGlobalPipes(new ValidationPipe({
  //     transform: true,
  //     transformOptions: {
  //       enableImplicitConversion: true,
  //     },
  //     whitelist: true,
  //   }));
  await app.listen(process.env.PORT ?? 3000);
  // const bookingApp = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   BookingAppModule,
  //   {
  //     transport:Transport.TCP,

  //   }
  // )
  // await bookingApp.listen()
  /*const bookingApp = await NestFactory.create(BookingAppModule)
  //bookingApp.setGlobalPrefix('booking')
  await bookingApp.listen(process.env.BOOKING_PORT ?? 3000)*/
  //const trackingApp = await NestFactory.createMicroservice(TrackingAppModule)
  
  
  
  console.log("Waka jus")
}
bootstrap();
