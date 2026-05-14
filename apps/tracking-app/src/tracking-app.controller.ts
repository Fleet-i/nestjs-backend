import { Controller, Get } from '@nestjs/common';
import { TrackingAppService } from './tracking-app.service';

@Controller()
export class TrackingAppController {
  constructor(private readonly trackingAppService: TrackingAppService) {}

  @Get()
  getHello(): string {
    return this.trackingAppService.getHello();
  }
}
