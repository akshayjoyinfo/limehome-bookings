import * as dotenv from 'dotenv';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export abstract class IConfigService {
  constructor() {
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
  abstract get(key: string): string;

  abstract getDatabaseConfig(): PostgresConnectionOptions;
}
