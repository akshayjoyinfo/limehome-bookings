import { Point } from 'geojson';
import { type } from 'os';
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../global/database/base.entity';
import { Address } from '../dto/hotel/address.dto';
import { HotelEntity } from './hotel.entity';

@Entity('hotel_bookings')
@Index('idx_unique_hotel_bookings', ['hotelId', 'bookingDate'], { unique: true })
export class HotelBookingEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;


  
  @Column({
    type: 'bigint'
  })
  hotelId: number;

  @Column({
    type: 'timestamp with time zone'
  })
  bookingDate: Date; //utc so this can be formatted to any formats


  @ManyToOne((_type) => HotelEntity, (hotel) => hotel.bookings)
  hotel: HotelEntity;


 
}
