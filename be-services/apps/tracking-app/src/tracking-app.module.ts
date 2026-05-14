import { Module } from '@nestjs/common';
import { TrackingAppController } from './tracking-app.controller';
import { TrackingAppService } from './tracking-app.service';

@Module({
  imports: [],
  controllers: [TrackingAppController],
  providers: [TrackingAppService],
})
export class TrackingAppModule {}
