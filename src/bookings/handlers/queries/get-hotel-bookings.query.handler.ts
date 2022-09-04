import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BookingDetailReponseModel,
  BookingHotelResponseModel,
  BookingReferenceDetailModel,
  HotelBookingListResponseModel,
} from '../../../models/response/booking-response.model';
import { BookingEntity } from '../../entities/booking.entity';
import { GetHotelBookingsQuery } from '../../queries/get-hotels-bookings-query';

@QueryHandler(GetHotelBookingsQuery)
export class GetHotelBookingsQueryHandler
  implements IQueryHandler<GetHotelBookingsQuery>
{
  private logger = new Logger(GetHotelBookingsQueryHandler.name);

  constructor(
    @InjectRepository(BookingEntity)
    private readonly repository: Repository<BookingEntity>,
  ) {}

  async execute(
    query: GetHotelBookingsQuery,
  ): Promise<HotelBookingListResponseModel> {
    this.logger.log('Qyerying hotels based on Latitiude and Longitude');

    const hotelBookingsEntities = await this.repository.find({
      where: { hotelId: query.hotelId },
    });


    return this.mapToHotelBookingListResponseModel(hotelBookingsEntities);
  }

  private mapToHotelBookingListResponseModel(
    entities: BookingEntity[],
  ): HotelBookingListResponseModel {
    var results = [];
    if (entities.length == 0) {
      return {
        hotels: [],
      } as unknown as HotelBookingListResponseModel;
    }

    entities.forEach((bookingEntity) => {
      var bookingObj = {
        checkInDate: bookingEntity.checkInDate,
        checkOutDate: bookingEntity.checkOutDate,
        hotelId: +bookingEntity.hotelId,
        hotelName: bookingEntity?.hotel.name,
        bookingReferences: bookingEntity.allocations.map((alloc) => {
          return {
            alloctionId: +alloc.id,
            bookingId: +bookingEntity.id,
            bookingDate: alloc.bookingDate,
          } as BookingReferenceDetailModel;
        }),
      } as BookingDetailReponseModel;
      results.push(bookingObj);
    });

    var bookingEntity = entities[0];
    var h = bookingEntity?.hotel;
    return {
      bookings: results,
      hotel: {
        id: +h.id,
        name: h.name,
        sourceSystem: h.sourceSystem,
        sourceSystemIdentifier: h.sourceSystemId,
        outstandingRooms: h.totalRooms,
        address: h.address,
      } as unknown as BookingHotelResponseModel,
    } as HotelBookingListResponseModel;
  }
}
