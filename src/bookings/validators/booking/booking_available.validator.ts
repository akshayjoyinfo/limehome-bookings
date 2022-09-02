import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Repository } from 'typeorm';
import { CreateHotelBookingRequest } from '../../../models/request/hotel-booking-request.dto';
import { HotelEntity } from '../../entities/hotel.entity';
import { HotelBookingEntity } from '../../entities/hotel_booking.entity';

@ValidatorConstraint({ name: 'BookingAvailable', async: true })
@Injectable()
export class BookingAvailableValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(HotelBookingEntity)
    private readonly repository: Repository<HotelBookingEntity>,
  ) {}

  async validate(value: CreateHotelBookingRequest) {
    try {

        

      var records = await this.repository.query(`
        select booking_date::date,count(1) from hotel_bookings
        where hotel_id=$3 AND booking_date::date >=$1 and booking_date::date <$2
        group by booking_date::date
        having count(1) > 10
      `,[checkIn, checkOut, value.hotelId]);

      if(records.length >0)
        return false;

    } catch (e) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `No Rooms available between ${args.value?.checkInDate} & ${args.value?.checkOutDate}`;
  }
}
