import { Test, TestingModule } from '@nestjs/testing';

import { BookingsModule } from '../bookings.module';

describe('MainModule', () => {
  let bookingsModule: BookingsModule;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [BookingsModule],
    }).compile();

    bookingsModule = app.get<BookingsModule>(BookingsModule);
  });

  it('should be defined', () => {
    expect(bookingsModule).toBeInstanceOf(BookingsModule);
  });
});
