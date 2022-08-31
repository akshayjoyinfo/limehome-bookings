import { Injectable, Logger } from '@nestjs/common';
import { Point } from 'geojson';


import { HotelEntity } from '../../entities/hotel.entity';
import { HereHotelsRecievedEvent } from '../../events/here-hotels-recieved.event';

@Injectable()
export class HereHotelsRecievedEventHandler {
  private logger = new Logger(HereHotelsRecievedEventHandler.name);

  constructor() {}

  //@OnEvent('here.hotels.recieved', { async: true })
  async handleHotelsRecievedEvent(event: HereHotelsRecievedEvent) {

    this.logger.log('Ingested Here Hotels Entities');
  }
}
