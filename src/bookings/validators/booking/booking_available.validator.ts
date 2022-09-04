import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Repository } from 'typeorm';
import { IConfigService } from '../../../global/config/config.adapter';
import { CreateHotelBookingRequest } from '../../../models/request/hotel-booking-request.dto';
import { HotelEntity } from '../../entities/hotel.entity';
import { BookingAllocationEntity } from '../../entities/booking-allocation.entity';

@ValidatorConstraint({ name: 'BookingAvailable', async: true })
@Injectable()
export class BookingAvailableValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(BookingAllocationEntity)
    private readonly repository: Repository<BookingAllocationEntity>,
    private readonly configService: IConfigService
  ) {}

  async validate(value: CreateHotelBookingRequest) {
    try {
      var limitBookingPerDay = +this.configService.get('BOOKINGS_PER_DAY')
      var records = await this.repository.query(`
        select booking_date::date,count(1) from booking_allocations
        where hotel_id=$3 AND booking_date::date >=$1 and booking_date::date <$2
        group by hotel_id,booking_date::date
        having count(1) >= $4
      `,[value.checkInDate, value.checkOutDate, value.hotelId,limitBookingPerDay]);

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
