import { Controller, Get } from '@nestjs/common';
import { BookingAppService } from './booking-app.service';

@Controller('booking')
export class BookingAppController {
  constructor(private readonly bookingAppService: BookingAppService) {}

  @Get()
  getHello(): string {
    return this.bookingAppService.getHello();
  }
}
