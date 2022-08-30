import { Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { HereHotelsRecievedEvent } from "../../events/here-hotels-recieved.event";


@Injectable()
export class HereHotelsRecievedEventHandler {
    private logger = new Logger(HereHotelsRecievedEventHandler.name);

  @OnEvent('here.hotels.recieved', { async: true})  
  handleOrderCreatedEvent(event: HereHotelsRecievedEvent) {
    // handle and process "HereHotelsRecievedEvent" event
    setTimeout(()=>{
        this.logger.log('Ingested Here Hotels Entities');
    }, 5000)
  }
}