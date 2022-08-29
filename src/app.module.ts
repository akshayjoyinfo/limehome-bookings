import { ConfigModule } from './global/config/config.module';
import { GlobalModule } from './global/global.module';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { IConfigService } from './global/config/config.adapter';
import { ConfigurationService } from './global/config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ConfigModule, HttpModule,
    TypeOrmModule.forRootAsync({
      name: 'bookings',
      imports: [ConfigModule],
      useFactory: (configService: IConfigService) =>
      configService.getDatabaseConfig(),
      inject: [IConfigService]
    }),
    TerminusModule],
  controllers: [HealthController],
  providers: [{
    provide: IConfigService,
    useClass: ConfigurationService
  }],
})
export class AppModule {}
