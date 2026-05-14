import { Module } from '@nestjs/common';
import { BookingAppController } from './booking-app.controller';
import { BookingAppService } from './booking-app.service';

@Module({
  imports: [],
  controllers: [BookingAppController],
  providers: [BookingAppService],
})
export class BookingAppModule {}
