import * as dotenv from 'dotenv';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export abstract class IConfigService {
  
  abstract get(key: string): string;

  abstract getDatabaseConfig(): PostgresConnectionOptions;
}
