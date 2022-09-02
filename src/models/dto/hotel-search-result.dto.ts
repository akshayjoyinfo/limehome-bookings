import { Address } from '../here/hotel-here-item.model';

export interface HotelSearchResult {
  id: number;
  name: string;
  sourceSystem: string;
  sourceSystemIdentifier: string;
  address: Address;
  outstandingRooms: number;
  latitude: number;
  longitude: number;
  distanceInMeters: number;
}
