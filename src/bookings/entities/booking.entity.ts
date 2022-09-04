import { Point } from 'geojson';
import { type } from 'os';
import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../global/database/base.entity';
import { Address } from '../dto/hotel/address.dto';
import { HotelEntity } from './hotel.entity';
import { BookingAllocationEntity } from './booking-allocation.entity';

@Entity('bookings')
export class BookingEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;


  
  @Column({
    type: 'bigint'
  })
  hotelId: number;

  @Column({
    type: 'timestamp with time zone'
  })
  checkInDate: Date; //utc so this can be formatted to any formats


  @Column({
    type: 'timestamp with time zone'
  })
  checkOutDate: Date; //utc so this can be formatted to any formats

  @Column({
  })
  guestName: string; //utc so this can be formatted to any formats

  @Column({
  })
  guestMail: string; //utc so this can be formatted to any formats


  @ManyToOne((_type) => HotelEntity, (hotel) => hotel.bookings,{eager: true})
  hotel: HotelEntity;


  @OneToMany((_type) => BookingAllocationEntity, (allocation) => allocation.booking, {eager: true})
  allocations: BookingAllocationEntity[];
}
