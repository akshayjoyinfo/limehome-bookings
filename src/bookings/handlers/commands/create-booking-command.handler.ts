import { BadRequestException, UseFilters } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { AppExceptionFilter } from '../../../utils/filters/app-exception.filter';
import { CreateBookingCommand } from '../../commands/create-booking.command';
import { IngestHotelsFromHereCommand } from '../../commands/ingest-hotels-from-here.command';
import { HotelEntity } from '../../entities/hotel.entity';
import { BookingAllocationEntity } from '../../entities/booking-allocation.entity';
import { BookingEntity } from '../../entities/booking.entity';
import {
    BookingDetailReponseModel,
  BookingReferenceDetailModel,

} from '../../../models/response/booking-response.model';
/**
 * CreateBookingCommandHandler
 *
 * Create Booking for Hotel
 */
@CommandHandler(CreateBookingCommand)
@UseFilters(AppExceptionFilter)
export class CreateBookingCommandHandler
  implements ICommandHandler<CreateBookingCommand>
{
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<BookingEntity>,
    @InjectRepository(BookingAllocationEntity)
    private readonly bookingAllocationRepository: Repository<BookingAllocationEntity>,
  ) {}

  async execute(command: CreateBookingCommand): Promise<BookingDetailReponseModel> {
    var validationResults = await validate(command);

    if (validationResults.length > 0) {
      // this is business valiation erros for HOTEL-DATE booking combination maximum is 10
      // by considering SRP validation rules kept in different place ,
      // might refactor later with more elgant flutent validations
      // ideally I call specifically for validate object, it needs to pass throuhg some pipelien level before reaching command handler
      // need to validate, but need to research little bit here
      throw new BadRequestException(validationResults);
    }

    this.transformDatesForBookingRequest(command);

    var newBooking = this.createBookingEntityFromCommand(command);

    
    
    await this.bookingRepository.save(newBooking);
    
    var bookingAllocations =
      this.createBookingAllocationsEntityFromCommand(command,newBooking);
      newBooking.allocations = bookingAllocations;

    await this.bookingAllocationRepository.save(bookingAllocations);

    var createBookingEntity = await this.bookingRepository.findOne({
        where: [{ id: newBooking.id}]
    });

    
    return this.transformBookingIntoBookingResponseModel(createBookingEntity);
    
  }

  transformDatesForBookingRequest(command: CreateBookingCommand) {
    const timePortion = new Date().getTime() % (3600 * 1000 * 24);
    var checkIn = new Date(
      +command.bookingRequest.checkInDate - timePortion + 14 * 60 * 60 * 1000,
    );

    var checkOut = new Date(
      +command.bookingRequest.checkOutDate - timePortion + 11 * 60 * 60 * 1000,
    );

    command.bookingRequest.checkInDate = checkIn;
    command.bookingRequest.checkOutDate = checkOut;

    console.log(command);
  }

  createBookingEntityFromCommand(command:CreateBookingCommand): BookingEntity {
    return {
      hotelId: command.bookingRequest.hotelId,
      checkInDate: command.bookingRequest.checkInDate,
      checkOutDate: command.bookingRequest.checkOutDate,
      createdAtUtc: new Date(),
      createdBy: command.bookingRequest?.guest?.name,
      guestMail: command.bookingRequest?.guest?.email,
      guestName: command.bookingRequest?.guest?.name,
    } as BookingEntity;
  }

  createBookingAllocationsEntityFromCommand(
    command:CreateBookingCommand, bookingEntity:BookingEntity
  ): BookingAllocationEntity[] {
    var bookings: BookingAllocationEntity[] = [];

    for (
      var bookingDate = command.bookingRequest.checkInDate;
      bookingDate < command.bookingRequest.checkOutDate;
      bookingDate.setDate(bookingDate.getDate() + 1)
    ) {
      console.log(bookingDate);
      bookings.push({
        hotelId: command.bookingRequest.hotelId,
        bookingDate: new Date(bookingDate),
        createdAtUtc: new Date(),
        bookingId: bookingEntity.id,
        createdBy: command.bookingRequest?.guest?.name,
      } as BookingAllocationEntity);
    }

    return bookings;
  }

  transformBookingIntoBookingResponseModel(
    bookingEntity: BookingEntity,
  ): BookingDetailReponseModel {

    

    return {
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
      } as BookingDetailReponseModel
  }
}
