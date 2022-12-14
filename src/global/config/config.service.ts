/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { IConfigService } from './config.adapter';
import { SnakeNamingStrategy } from '../database/snake-naming.startegy';
import { DB } from '../../enums/database-connection.enum';
import { HotelEntity } from '../../bookings/entities/hotel.entity';
import { BookingEntity } from '../../bookings/entities/booking.entity';
import { BookingAllocationEntity } from '../../bookings/entities/booking-allocation.entity';

@Injectable()
export class ConfigurationService
  extends ConfigService
  implements IConfigService
{
  constructor() {
    super();
    dotenv.config({
      path: `.env`,
    });

    for (const envName of Object.keys(process.env)) {
      process.env[envName] = process.env[envName].replace(/\\n/g, '\n');
    }
  }

  get(key: string): string {
    return process.env[key];
  }

  getDatabaseConfig(): PostgresConnectionOptions {
    return {
      type: 'postgres',
      url: this.get('DB_URL'),
      entities: [HotelEntity, BookingEntity, BookingAllocationEntity],
      migrationsTableName: 'migrations',
      migrations: ['dist/migrations/*.js'],
      synchronize: true,
      logging: ['error'], //['query', 'error'],
      namingStrategy: new SnakeNamingStrategy(),
      useUTC: true,
    };
  }
}
