import { Test, TestingModule } from '@nestjs/testing';
import { TrackingAppController } from './tracking-app.controller';
import { TrackingAppService } from './tracking-app.service';

describe('TrackingAppController', () => {
  let trackingAppController: TrackingAppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TrackingAppController],
      providers: [TrackingAppService],
    }).compile();

    trackingAppController = app.get<TrackingAppController>(TrackingAppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(trackingAppController.getHello()).toBe('Hello World!');
    });
  });
});
