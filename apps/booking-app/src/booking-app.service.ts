import { Injectable } from '@nestjs/common';

@Injectable()
export class BookingAppService {
  getHello(): string {
    return 'Hello World from BookingAppSErvices!';
  }
}
