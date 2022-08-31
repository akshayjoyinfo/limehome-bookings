import { Test } from '@nestjs/testing';

import { IConfigService } from '../config.adapter';
import { ConfigModule } from '../config.module';

describe('SecretsService', () => {
  let commonConfigs: IConfigService;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      imports: [ConfigModule],
    }).compile();

    commonConfigs = app.get(IConfigService);
  });

  describe('bookings:Configs:Common', () => {
    test('should get API_PORT successfully', () => {
      expect(commonConfigs.get('API_PORT')).toEqual('3000');
    });
    test('should get HERE_API_HOST successfully', () => {
      expect(commonConfigs.get('HERE_API_HOST')).toEqual('https://discover.search.hereapi.com');
    });
    test('should get HERE_API_KEY successfully', () => {
      expect(commonConfigs.get('HERE_API_KEY')).toEqual('cbwwDJHnUyfQFUJZj6ZVWigKe-mpTLLndNpN54l0FF4');
    });
  });

  describe('bookings:Configs:DatabaseConfig', () => {
    test('should get PG_DATABASE_Config successfully', () => {
        expect(commonConfigs.getDatabaseConfig()).toBeDefined();
      expect(commonConfigs.getDatabaseConfig().type).toEqual('postgres');
      expect(commonConfigs.getDatabaseConfig().url).toEqual(commonConfigs.get('DB_URL'));
    });
  });


});
