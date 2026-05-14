import { Controller, Get } from '@nestjs/common';
import { BookingAppService } from './booking-app.service';
import { StudentService } from 'common/mongo-orm/student/student.service';

@Controller('booking')
export class BookingAppController {
  constructor(
    private readonly bookingAppService: BookingAppService, 
    //private readonly studentService:StudentService
  ) {}

  @Get()
  getHello(): string {
    //this.studentService.saySomething()
    return this.bookingAppService.getHello();
  }
}
