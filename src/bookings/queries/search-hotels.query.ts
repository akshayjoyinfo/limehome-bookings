import { HotelHereItemModel } from '../../models/here/hotel-here-item.model';

export class SerachHotelsQuery {
  latitude: number;
  longitude: number;

  constructor(_latitude: number, _longitude: number) {
    this.latitude = _latitude;
    this.longitude = _longitude;
  }
}
