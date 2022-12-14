import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { DB } from './enums/database-connection.enum';
import { IConfigService } from './global/config/config.adapter';
import { ApiContracts } from './utils/docs/api-contracts';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private configService: IConfigService,
    @InjectConnection()
    private bookingsConnetion: Connection,
    private db: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  @ApiOperation(ApiContracts.LIMEHOME_BOOKINGS_API_Health)
  check() {
    return this.health.check([
      () => this.http.pingCheck('HERE:API', 'https://developer.here.com'),
      () =>
        this.db.pingCheck('LimeHome:DB', {
          connection: this.bookingsConnetion,
        }),
    ]);
  }
}
