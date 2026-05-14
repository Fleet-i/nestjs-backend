import { Injectable } from '@nestjs/common';

@Injectable()
export class TrackingAppService {
  getHello(): string {
    return 'Hello World!';
  }
}
