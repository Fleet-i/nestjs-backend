import { Test, TestingModule } from '@nestjs/testing';
import { BookingAppController } from './booking-app.controller';
import { BookingAppService } from './booking-app.service';

describe('BookingAppController', () => {
  let bookingAppController: BookingAppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BookingAppController],
      providers: [BookingAppService],
    }).compile();

    bookingAppController = app.get<BookingAppController>(BookingAppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(bookingAppController.getHello()).toBe('Hello World!');
    });
  });
});
