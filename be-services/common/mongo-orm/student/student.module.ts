import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentController } from './student.controller';
import { StudentSchema } from './student.scehma';
import { StudentService } from './student.service';
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    MongooseModule.forRoot(`${process.env.ATLAS_MONGO_URI}`),
    MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }])
  ],
  controllers: [
    StudentController
  ],
  providers: [
    // {
    //   provide:APP_INTERCEPTOR,
    //   useClass:ExampleInterceptor
    // },
    StudentService
  ],
  exports:[
    StudentService
  ]
})
export class MongoModule {}
