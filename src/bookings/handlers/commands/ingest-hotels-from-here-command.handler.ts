import { Inject, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Point } from 'geojson';
import { lastValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { HotelDataProviderSource } from '../../../enums/hotel-data-provider-source.enum';
import { HotelHereApiResponseModel } from '../../../models/here/hotel-here-api-response-model';
import { HotelHereItemModel } from '../../../models/here/hotel-here-item.model';
import {
  HOTEL_DATA_PROVIDER_SERVICE,
  IHotelDataProvider,
} from '../../adapters/hotel-data-provider.adapter';
import { IngestHotelsFromHereCommand } from '../../commands/ingest-hotels-from-here.command';
import { HotelEntity } from '../../entities/hotel.entity';


@CommandHandler(IngestHotelsFromHereCommand)
export class IngestHotelsFromHereCommandHandler
  implements ICommandHandler<IngestHotelsFromHereCommand>
{
  private logger = new Logger(IngestHotelsFromHereCommandHandler.name);
/**
 * Creates an instance of ingest hotels from here command handler.
 * @param _dataProviders 
 * @param repository 
 */
constructor(
    //private readonly eventEmitter: EventEmitter2,
    @Inject(HOTEL_DATA_PROVIDER_SERVICE)
    private readonly _dataProviders: IHotelDataProvider[],
    @InjectRepository(HotelEntity)
    private readonly repository: Repository<HotelEntity>,
  ) {}
  async execute(
    command: IngestHotelsFromHereCommand,
  ): Promise<HotelHereApiResponseModel> {
    command.raidusInMeters = Math.trunc(command.raidusInMeters);

    const hereServiceInstance = this._dataProviders.filter(
      (ob) => ob.provider === HotelDataProviderSource.HERE,
    )[0];

    const res = (await lastValueFrom(
      hereServiceInstance.getHotelsWithCoordinates(
        command.latitude,
        command.longitude,
        command.raidusInMeters,
      ),
    )) as unknown as HotelHereApiResponseModel;

    
    this.ingestEntities(res.items);
    this.logger.log(`Sync completed`);
    return res;
  }

  async ingestEntities(hotels: HotelHereItemModel[]) {
    const hotelEnities: HotelEntity[] = [];
    this.logger.log(`Ingesting ${hotels.length} Hotels`);

    hotels.forEach((element) => {
      const pointObject: Point = {
        type: 'Point',
        coordinates: [element?.position?.lng, element?.position?.lat],
      };
      hotelEnities.push({
        name: element.title,
        sourceSystem: 'HERE',
        sourceSystemId: element.id,
        createdBy: 'HERE-Sync',
        createdAtUtc: new Date(),
        address: element.address,
        geoLocation: pointObject,
        totalRooms: 10 // why accoridng to problem statement rooms is 10 ideally there will be 
        // hotel_rooms table will be allocated to present this with room type for the context of task
      } as HotelEntity);
    });

    this.repository.upsert(hotelEnities, ['sourceSystemId', 'sourceSystem']);
    this.logger.log(`Hotels ${hotelEnities.length} were upserted`);
  }
}
