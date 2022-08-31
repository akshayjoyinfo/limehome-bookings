import { HttpService } from "@nestjs/axios";
import { Test } from "@nestjs/testing";
import { Observable, of } from "rxjs";
import { AxiosResponse } from 'axios';
import { HotelDataProviderSource } from "../../enums/hotel-data-provider-source.enum";
import { IConfigService } from "../../global/config/config.adapter";
import { HotelHereApiResponseModel } from "../../models/here/hotel-here-api-response-model";
import { HOTEL_DATA_PROVIDER_SERVICE, IHotelDataProvider } from "../adapters/hotel-data-provider.adapter";
import { HereHotelDataProviderService } from "../services/here-hotel-data-provider.service";

describe('HERE:Hotel-Data-Provider.Service', () => {
    let dataProviderService: IHotelDataProvider;
  
    beforeEach(async () => {
      const app = await Test.createTestingModule({
        imports: [],
        providers: [
          {
            provide: HOTEL_DATA_PROVIDER_SERVICE,
            useFactory: () =>
              new HereHotelDataProviderService(
                { get: jest.fn(()=> of({

                } as AxiosResponse<HotelHereApiResponseModel>)) } as unknown as HttpService,
                { get: jest.fn() } as unknown as IConfigService,
              ),
          },
        ],
      }).compile();
  
      dataProviderService = app.get(HOTEL_DATA_PROVIDER_SERVICE);
    });
  
    describe('HERE:Hotel Provider: Init', () => {
      test('should be initialized successfully', async () => {
        await expect(dataProviderService).toBeDefined();
      });

      test('should be HERE provider', async () => {
        await expect(dataProviderService.provider).toEqual(HotelDataProviderSource.HERE);
        await expect(dataProviderService.getHotelsWithCoordinates(10,10,500)).toBeDefined();
      });

      
    });
  });
  