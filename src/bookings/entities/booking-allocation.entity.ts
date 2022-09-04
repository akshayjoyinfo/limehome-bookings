import { Point } from 'geojson';
import { type } from 'os';
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../global/database/base.entity';
import { Address } from '../dto/hotel/address.dto';
import { BookingEntity } from './booking.entity';
import { HotelEntity } from './hotel.entity';

@Entity('booking_allocations')
export class BookingAllocationEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;


  
  @Column({
    type: 'bigint'
  })
  hotelId: number;

  @Column({
    type: 'bigint'
  })
  bookingId: number

  @Column({
    type: 'timestamp with time zone'
  })
  bookingDate: Date; //utc so this can be formatted to any formats


  @ManyToOne((_type) => HotelEntity, (hotel) => hotel.bookings)
  hotel: HotelEntity;

  @ManyToOne((_type) => BookingEntity, (booking) => booking.allocations)
  booking: BookingEntity;

}
