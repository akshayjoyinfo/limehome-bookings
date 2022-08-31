import { Inject, Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
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
import { HereHotelsRecievedEvent } from '../../events/here-hotels-recieved.event';
import { HereHotelsRecievedEventHandler } from '../events/here-hotels-recieved-event.handler';

@CommandHandler(IngestHotelsFromHereCommand)
export class IngestHotelsFromHereCommandHandler
  implements ICommandHandler<IngestHotelsFromHereCommand>
{
  private logger = new Logger(IngestHotelsFromHereCommandHandler.name);

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

    var res = (await lastValueFrom(
      hereServiceInstance.getHotelsWithCoordinates(
        command.latitude,
        command.longitude,
        command.raidusInMeters,
      ),
    )) as unknown as HotelHereApiResponseModel;

    await this.ingestEntities(res.items);
    return res;
  }

  async ingestEntities(hotels: HotelHereItemModel[]) {
    var hotelEnities: HotelEntity[] = [];

    hotels.forEach((element) => {
      const pointObject: Point = {
        type: 'Point',
        coordinates: [element?.position?.lng, element?.position?.lat],
      };
      console.log(element.id);
      hotelEnities.push({
        name: element.title,
        sourceSystem: 'HERE',
        sourceSystemId: element.id,
        createdBy: 'HERE-Sync',
        createdAtUtc: new Date(),
        address: element.address,
        geoLocation: pointObject,
      } as HotelEntity);

      this.repository.upsert(hotelEnities, ['sourceSystemId', 'sourceSystem']);
    });
  }
}
