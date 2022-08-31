import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../app.module';

describe('MainModule', () => {
  let mainModule: AppModule;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppModule],
    }).compile();

    mainModule = app.get<AppModule>(AppModule);
  });

  it('should be defined', () => {
    expect(mainModule).toBeInstanceOf(AppModule);
  });
});
