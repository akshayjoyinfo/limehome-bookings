import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HotelHereApiResponseModel } from '../../models/here/hotel-here-api-response-model';
import { AxiosResponse } from 'axios';
import { Double } from 'typeorm';
import { HereHotelDataProviderService } from '../services/here-hotel-data-provider.service';
import { HotelDataProviderSource } from '../../enums/hotel-data-provider-source.enum';

export const HOTEL_DATA_PROVIDER_SERVICE = 'HOTEL_DATA_PROVIDER_SERVICE';

export interface IHotelDataProvider {
  provider: HotelDataProviderSource;

  getHotelsWithCoordinates(
    latitude: number,
    longitude: number,
    radiusInMeters: number,
  ): Observable<AxiosResponse<HotelHereApiResponseModel>>;
}
