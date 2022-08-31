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
import { commandHandlers } from './handlers/commands';
import { TypeOrmModule } from '@nestjs/typeorm';
import { allEntities } from './entities';
import { HotelEntity } from './entities/hotel.entity';
import { DB } from '../enums/database-connection.enum';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
    CqrsModule,
    EventEmitterModule.forRoot(),
    TypeOrmModule.forFeature([HotelEntity]),
  ],
  controllers: [HereHotelsController],
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
    ...commandHandlers,
  ],
})
export class BookingsModule {}
