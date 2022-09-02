/*
https://docs.nestjs.com/modules
*/

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { IConfigService } from '../global/config/config.adapter';
import { ConfigurationService } from '../global/config/config.service';
import { HOTEL_DATA_PROVIDER_SERVICE } from './adapters/hotel-data-provider.adapter';
import { HereHotelsController } from './controllers/here-hotels.controller';
import { HereHotelDataProviderService } from './services/here-hotel-data-provider.service';
import { commandHandlers, queryHandlers } from './handlers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { allEntities } from './entities';
import { HotelEntity } from './entities/hotel.entity';
import { DB } from '../enums/database-connection.enum';
import { HotelsController } from './controllers/hotels.controller';
import { validators } from './validators';
import { HotelBookingEntity } from './entities/hotel_booking.entity';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
    CqrsModule,
    EventEmitterModule.forRoot(),
    TypeOrmModule.forFeature([HotelEntity, HotelBookingEntity]),
  ],
  controllers: [HereHotelsController, HotelsController],
  providers: [
    HereHotelDataProviderService,
    {
      provide: IConfigService,
      useClass: ConfigurationService,
    },
    {
      provide: HOTEL_DATA_PROVIDER_SERVICE,
      useFactory: (here) => [here],
      inject: [HereHotelDataProviderService],
    },
    ...validators,
    ...commandHandlers,
    ...queryHandlers,
  ],
})
export class BookingsModule {}
