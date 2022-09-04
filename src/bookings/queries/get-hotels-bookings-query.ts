import { HotelHereItemModel } from '../../models/here/hotel-here-item.model';

export class GetHotelBookingsQuery {
  hotelId: number;
  bookingDate: Date;

  constructor(_hotelId: number) {
    this.hotelId = _hotelId
  }
}
