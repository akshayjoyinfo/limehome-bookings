
import { Test, TestingModule } from '@nestjs/testing';

import { ConfigModule } from '../config.module';

describe('ConfigModule', () => {
  let loggerModule: ConfigModule;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [ConfigModule],
    }).compile();

    loggerModule = app.get<ConfigModule>(ConfigModule);
  });

  it('should be defined', () => {
    expect(loggerModule).toBeInstanceOf(ConfigModule);
  });
});
