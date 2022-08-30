import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';
import { HotelDataProviderSource } from '../../enums/hotel-data-provider-source.enum';
import { IConfigService } from '../../global/config/config.adapter';
import { HotelHereApiResponseModel } from '../../models/here/hotel-here-api-response-model';
import { IHotelDataProvider } from '../adapters/hotel-data-provider.adapter';

@Injectable()
export class HereHotelDataProviderService implements IHotelDataProvider {
  private readonly API_HOST: string;
  private readonly API_KEY: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: IConfigService,
  ) {
    this.API_HOST = this.configService.get('HERE_API_HOST');
    this.API_KEY = this.configService.get('HERE_API_KEY');
  }
  provider: HotelDataProviderSource = HotelDataProviderSource.HERE;

  private headersRequest: any = {
    'Content-Type': 'application/json',
  };

  getHotelsWithCoordinates(
    latitude: number,
    longitude: number,
    radiusInMeters = 500,
  ): Observable<AxiosResponse<HotelHereApiResponseModel>> {
    const hotelSearchRequestPath = `/v1/discover?in=circle:${latitude},${longitude};r=${radiusInMeters}&limit=100&q=hotel&apiKey=${this.API_KEY}`;
    const requestUrl = this.API_HOST + hotelSearchRequestPath;
    return this.httpService
      .get(requestUrl)
      .pipe(map((response) => response.data));
  }
}
