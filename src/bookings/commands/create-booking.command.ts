import { Type } from 'class-transformer';
import { Validate, ValidateNested } from 'class-validator';
import { HotelHereItemModel } from '../../models/here/hotel-here-item.model';
import { CreateHotelBookingRequest } from '../../models/request/hotel-booking-request.dto';
import { BookingAvailableValidator } from '../validators/booking/booking_available.validator';

export class CreateBookingCommand {
  
  @Validate(BookingAvailableValidator)
  bookingRequest: CreateHotelBookingRequest
  
  constructor(_bookingRequest:CreateHotelBookingRequest) {
    this.bookingRequest = _bookingRequest;
  }
}
