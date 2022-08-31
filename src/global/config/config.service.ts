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
  getNodeEnv(): string {
    return this.get('NODE_ENV') || 'local';
  }

  get(key: string): string {
    return process.env[key];
  }

  getDatabaseConfig(): PostgresConnectionOptions {
    return {
      type: 'postgres',
      url: this.get('DB_URL'),
      entities: ['dist/**/*.entity.js'],
      migrationsTableName: 'migrations',
      migrations: ['dist/migrations/*.js'],
      synchronize: true,
      logging: ['error'], //['query', 'error'],
      namingStrategy: new SnakeNamingStrategy(),
      useUTC: true,
    };
  }
}
