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
    BookingsModule,
    ConfigModule,
    HttpModule,
    TypeOrmModule.forRootAsync({
      name: 'bookings',
      imports: [ConfigModule],
      useFactory: (configService: IConfigService) =>
        configService.getDatabaseConfig(),
      inject: [IConfigService],
    }),
    TerminusModule,
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
