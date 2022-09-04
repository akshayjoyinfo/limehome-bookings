import { ApiProperty } from "@nestjs/swagger";
import { Point } from "geojson";
import { Address } from "../../bookings/dto/hotel/address.dto";

export class HotelListResponseModel{
    results: HotelResponseModel[]
}

export class HotelResponseModel {
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
    
    @ApiProperty()
    location: {
        latitude: number;
        longitude: number;
    }

}