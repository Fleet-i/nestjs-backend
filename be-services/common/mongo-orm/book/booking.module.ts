import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingController } from './book.controller';
import { BookingSchema } from './book.scehma';
import { BookService } from './book.service';
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    MongooseModule.forRoot(`${process.env.ATLAS_MONGO_URI}`),
    MongooseModule.forFeature([{ name: 'Booking', schema: BookingSchema }])
  ],
  controllers: [
    BookingController
  ],
  providers: [
    // {
    //   provide:APP_INTERCEPTOR,
    //   useClass:ExampleInterceptor
    // },
    BookService
  ],
  exports:[
    BookService
  ]
})
export class BookingModuleForMongo {}
