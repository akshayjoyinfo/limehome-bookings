import { Inject, Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { lastValueFrom } from 'rxjs';
import { HotelDataProviderSource } from '../../../enums/hotel-data-provider-source.enum';
import { HotelHereApiResponseModel } from '../../../models/here/hotel-here-api-response-model';
import {
  HOTEL_DATA_PROVIDER_SERVICE,
  IHotelDataProvider,
} from '../../adapters/hotel-data-provider.adapter';
import { IngestHotelsFromHereCommand } from '../../commands/ingest-hotels-from-here.command';
import { HereHotelsRecievedEvent } from '../../events/here-hotels-recieved.event';

@CommandHandler(IngestHotelsFromHereCommand)
export class IngestHotelsFromHereCommandHandler
  implements ICommandHandler<IngestHotelsFromHereCommand>
{
  private logger = new Logger(IngestHotelsFromHereCommandHandler.name);

  constructor(
    private readonly eventEmitter: EventEmitter2,
    @Inject(HOTEL_DATA_PROVIDER_SERVICE)
    private readonly _dataProviders: IHotelDataProvider[],
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

    const hotelsRecievedEvent = new HereHotelsRecievedEvent();
    hotelsRecievedEvent.hotels = res.items;

    this.eventEmitter.emit('here.hotels.recieved', hotelsRecievedEvent);

    return res;
  }
}
