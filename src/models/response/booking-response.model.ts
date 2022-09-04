import { ApiProperty } from '@nestjs/swagger';
import { Address } from '../../bookings/dto/hotel/address.dto';
import { HotelResponseModel } from './hotel-list-response.model';

export class HotelBookingListResponseModel {
    
    @ApiProperty()
    hotel: BookingHotelResponseModel;

    @ApiProperty()
    bookings: BookingDetailReponseModel[]
}


export class BookingHotelResponseModel {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    sourceSystem: string;
    
    @ApiProperty()
    sourceSystemIdentifier: string;

    @ApiProperty()
    address: Address;
    
    @ApiProperty()
    outstandingRooms: number;

}

export class BookingDetailReponseModel {
  @ApiProperty()
  checkInDate: Date;

  @ApiProperty()
  checkOutDate: Date;

  @ApiProperty()
  hotelId: number;

  @ApiProperty()
  hotelName: string;

  @ApiProperty()
  bookingReferences: BookingReferenceDetailModel[];
}

export class BookingReferenceDetailModel {
  @ApiProperty()
  bookingId: number;

  @ApiProperty()
  bookingDate: Date;

  @ApiProperty()
  alloctionId: number;
}
