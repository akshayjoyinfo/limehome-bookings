import { HotelHereItemModel } from "../../models/here/hotel-here-item.model";

export class IngestHotelsFromHereCommand {
    latitude: number;
    longitude: number;
    raidusInMeters: number;
    constructor(_latitude: number,_longitude: number,_raidusInMeters: number){
        this.latitude = _latitude;
        this.longitude = _longitude;
        this.raidusInMeters = _raidusInMeters;
    }
}