import { HotelHereItemModel } from '../here/hotel-here-item.model';

export class GetHotelsBookingsQuery {
  hotelId: number;
  bookingDate: Date;

  constructor(_hotelId: number, _bookingDate: Date) {
    this.hotelId = _hotelId;
    this.bookingDate = _bookingDate;
  }
}
