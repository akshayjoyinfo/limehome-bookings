import { Inject, Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HotelSearchResult } from '../../../models/dto/hotel-search-result.dto';
import {
  HotelListResponseModel,
  HotelResponseModel,
} from '../../../models/response/hotel-list-response.model';
import {
  HOTEL_DATA_PROVIDER_SERVICE,
  IHotelDataProvider,
} from '../../adapters/hotel-data-provider.adapter';
import { HotelEntity } from '../../entities/hotel.entity';
import { SerachHotelsQuery } from '../../queries/search-hotels.query';

@QueryHandler(SerachHotelsQuery)
export class SerachHotelsQueryHandler
  implements IQueryHandler<SerachHotelsQuery>
{
  private logger = new Logger(SerachHotelsQueryHandler.name);

  constructor(
    @InjectRepository(HotelEntity)
    private readonly repository: Repository<HotelEntity>,
  ) {}

  async execute(query: SerachHotelsQuery): Promise<HotelListResponseModel> {
    this.logger.log('Qyerying hotels based on Latitiude and Longitude');

    const entities = (await this.repository.query(
      `SELECT * , geo_location <->ST_MakePoint($1,$2) AS distanceInMeters,
        ST_Y(geo_location::geometry) as latitude, 
        ST_X(geo_location::geometry) as longitude 
        FROM hotels 
        WHERE geo_location <->ST_MakePoint($1,$2 ) < 500
        ORDER BY distanceInMeters LIMIT 50;
        `,
      [query.longitude, query.latitude],
    )) as HotelSearchResult[];

    return this.mapToHotelResponseModel(entities);
  }

  private mapToHotelResponseModel(
    entities: HotelSearchResult[],
  ): HotelListResponseModel {
    var results = [];
    entities.forEach((h) => {
      var hotelObj = {
        id: +h.id,
        name: h.name,
        sourceSystem: h.sourceSystem,
        sourceSystemIdentifier: h.sourceSystemIdentifier,
        outstandingRooms: h.outstandingRooms,
        address: h.address,
        location: {
          latitude: h.latitude,
          longitude: h.longitude,
        },
      } as unknown as HotelResponseModel;
      results.push(hotelObj);
    });
    return {
      results,
    } as HotelListResponseModel;
  }
}
