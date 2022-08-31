/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Inject, ParseFloatPipe, ParseIntPipe, Query } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { HotelDataProviderSource } from '../../enums/hotel-data-provider-source.enum';
import { HotelHereApiResponseModel } from '../../models/here/hotel-here-api-response-model';
import { HereHotelSyncRequest } from '../../models/request/here-hotel-request.dto';
import { ApiContracts } from '../../utils/docs/api-contracts';
import {
  HOTEL_DATA_PROVIDER_SERVICE,
  IHotelDataProvider,
} from '../adapters/hotel-data-provider.adapter';
import { IngestHotelsFromHereCommand } from '../commands/ingest-hotels-from-here.command';

@Controller('here-hotels')
export class HereHotelsController {
  constructor(
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  @ApiOperation(ApiContracts.LIMEHOME_BOOKINGS_API_Here_Hotels)
  @ApiQuery({
    name: 'latitude',
    type: Number,
    description: 'Latitude for location',
    required: true,
  })
  @ApiQuery({
    name: 'longitude',
    type: Number,
    description: 'Longitude for location',
    required: true,
  })
  @ApiQuery({
    name: 'distance',
    type: Number,
    description: 'Circular distance within meters',
    required: false,
    
  })
  async retrieveHotelsWithHere(@Query() query: HereHotelSyncRequest
  ) {
   
    return this.commandBus
    .execute<IngestHotelsFromHereCommand, HotelHereApiResponseModel>
    (new IngestHotelsFromHereCommand(query.latitude, query.longitude,query.distance))
  }
}
