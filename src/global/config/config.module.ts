/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { IConfigService } from './config.adapter';
import { ConfigurationService } from './config.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: IConfigService,
      useClass: ConfigurationService,
    },
  ],
  exports: [IConfigService],
})
export class ConfigModule {}
