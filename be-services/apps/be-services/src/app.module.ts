import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookingAppModule } from 'apps/booking-app/src/booking-app.module';
import { AiOrchestratorModule } from 'apps/ai-orchestrator/src/ai-orchestrator.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ExampleInterceptor } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentController } from 'common/mongo-orm/student/student.controller';
import { StudentSchema } from 'common/mongo-orm/student/student.scehma';
import { StudentService } from 'common/mongo-orm/student/student.service';
import { MongoModule } from 'common/mongo-orm/student/student.module';
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    // MongooseModule.forRoot(`${process.env.ATLAS_MONGO_URI}`),
    // MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }]),
    MongoModule,
    BookingAppModule, 
    AiOrchestratorModule
  ],
  controllers: [
    AppController
    //StudentController
  ],
  providers: [
    AppService,
    {
      provide:APP_INTERCEPTOR,
      useClass:ExampleInterceptor
    }
    //StudentService
  ],
})
export class AppModule {}
