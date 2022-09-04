/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { query } from 'express';
import { HotelHereApiResponseModel } from '../../models/here/hotel-here-api-response-model';
import { HereHotelSyncRequest } from '../../models/request/here-hotel-request.dto';
import { CreateHotelBookingRequest, HotelBookngParam } from '../../models/request/hotel-booking-request.dto';
import { GetHotelsBookingsQuery } from '../../models/request/get-hotels-bookings-query.dto';
import { BookingDetailReponseModel, HotelBookingListResponseModel } from '../../models/response/booking-response.model';
import { ApiContracts } from '../../utils/docs/api-contracts';
import { CreateBookingCommand } from '../commands/create-booking.command';
import { IngestHotelsFromHereCommand } from '../commands/ingest-hotels-from-here.command';
import { GetHotelBookingsQuery } from '../queries/get-hotels-bookings-query';
import { SerachHotelsQuery } from '../queries/search-hotels.query';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus) {}

  @Get()
  @ApiOperation(ApiContracts.LIMEHOME_BOOKINGS_API_Hotels_Search)
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
  async searchHotels(@Query() query: HereHotelSyncRequest):Promise<HotelHereApiResponseModel> {
    return this.queryBus.execute<SerachHotelsQuery, HotelHereApiResponseModel>(
      new SerachHotelsQuery(query.latitude, query.longitude),
    );
  }


  @Post('/:hotelId')
  @ApiOperation(ApiContracts.LIMEHOME_BOOKINGS_API_Hotels_Booking)
  @ApiParam({
    name: 'hotelId',
    type: Number,
    description: 'Hotel ID for LimeHome Hotels, get the ID from Hotel Search',
    required: true,
  })
  async createBookingInHotel(@Param() param: HotelBookngParam,@Body() bookingRequest: CreateHotelBookingRequest):Promise<BookingDetailReponseModel>  {
    return this.commandBus.execute<
      CreateBookingCommand,
      BookingDetailReponseModel
    >(
      new CreateBookingCommand(
        bookingRequest
      ),
    );
  }

  @Get('/:hotelId/bookings')
  @ApiOperation(ApiContracts.LIMEHOME_BOOKINGS_API_Hotels_Retrieve_Bookings)
  @ApiParam({
    name: 'hotelId',
    type: Number,
    description: 'Hotel ID for LimeHome Hotels, get the ID from Hotel Search',
    required: true,
  })
  async getBookingsForHotel(@Param() param: HotelBookngParam): Promise<HotelBookingListResponseModel>  {
    return this.queryBus.execute<GetHotelsBookingsQuery, HotelBookingListResponseModel>(
      new GetHotelBookingsQuery(param.hotelId),
    );
  }
}
