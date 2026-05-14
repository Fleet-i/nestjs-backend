import { Module } from '@nestjs/common';
import { BookingAppController } from './booking-app.controller';
import { BookingAppService } from './booking-app.service';
import { MongoModule } from 'common/mongo-orm/student/student.module';

@Module({
  imports: [
    MongoModule
  ],
  controllers: [BookingAppController],
  providers: [BookingAppService],
})
export class BookingAppModule {}
