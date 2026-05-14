import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookingAppModule } from 'apps/booking-app/src/booking-app.module';
import { AiOrchestratorModule } from 'apps/ai-orchestrator/src/ai-orchestrator.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ExampleInterceptor } from './app.controller';
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    BookingAppModule, 
    AiOrchestratorModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide:APP_INTERCEPTOR,
      useClass:ExampleInterceptor
    }
  ],
})
export class AppModule {}
