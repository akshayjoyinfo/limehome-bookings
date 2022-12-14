import { Point } from 'geojson';
import { type } from 'os';
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../global/database/base.entity';
import { Address } from '../dto/hotel/address.dto';
import { BookingAllocationEntity } from './booking-allocation.entity';
import { BookingEntity } from './booking.entity';

@Entity('hotels')
@Index('idx_unique_hotel', ['sourceSystem', 'sourceSystemId'], { unique: true })
export class HotelEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @Column({
    length: 250,
    nullable: false,
  })
  name: string;

  @Column({
    length: 100,
    nullable: false,
  })
  sourceSystem: string;

  @Column({
    length: 100,
    nullable: false,
  })
  sourceSystemId: string;

  @Column({
    type: 'jsonb',
    nullable: false,
  })
  address: Address;

  @Index('idx_hotel_geo_location', { spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  geoLocation: Point;

  @Column({
    nullable: true,
  })
  totalRooms: number;


  @OneToMany((_type) => BookingEntity, (booking) => booking.hotel)
  bookings: BookingEntity[];

  @OneToMany((_type) => BookingAllocationEntity, (booking) => booking.hotel)
  allocations: BookingAllocationEntity[];
}
