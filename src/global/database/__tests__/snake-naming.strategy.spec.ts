import { Test } from '@nestjs/testing';
import { SnakeNamingStrategy } from '../snake-naming.startegy';

// statergy is basically take all the naming conventions
// file is shared with typeorm to adapt strategy so in the scope of task
// covered only couple of tets
describe('SecretsService', () => {
  let startegy: SnakeNamingStrategy;

  beforeEach(async () => {
    startegy = new SnakeNamingStrategy();
  });

  describe('Snake Naming Strategy', () => {
    test('should get columnName compliant', () => {
      expect(startegy.columnName('hotelName', '', [])).toEqual('hotel_name');
    });

    test('should get columnName compliant', () => {
      expect(startegy.tableName('HotelBooking', '')).toEqual('hotel_booking');
    });

    test('should get relationName compliant', () => {
      expect(startegy.relationName('hotelBooking')).toEqual('hotel_booking');
    });
  });
});
