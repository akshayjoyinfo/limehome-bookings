import { BookingsModule } from './bookings/bookings.module';
import { ConfigModule } from './global/config/config.module';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { IConfigService } from './global/config/config.adapter';
import { ConfigurationService } from './global/config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { DB } from './enums/database-connection.enum';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
    ConfigModule,
    HttpModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: IConfigService) =>
        configService.getDatabaseConfig(),
      inject: [IConfigService],
    }),
    TerminusModule,
    BookingsModule,
  ],
  controllers: [HealthController],
  providers: [
    {
      provide: IConfigService,
      useClass: ConfigurationService,
    },
  ],
})
export class AppModule {}
