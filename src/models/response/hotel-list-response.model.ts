import { Point } from "geojson";
import { Address } from "../../bookings/dto/hotel/address.dto";

export class HotelListResponseModel{
    results: HotelResponseModel[]
}

export class HotelResponseModel {
    id: number;
    name: string;
    sourceSystem: string;
    sourceSystemIdentifier: string;
    address: Address;
    outstandingRooms: number;
    location: {
        latitude: number;
        longitude: number;
    }

}