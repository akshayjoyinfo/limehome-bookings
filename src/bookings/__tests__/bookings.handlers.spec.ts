import { Test } from "@nestjs/testing";
import { of } from "rxjs";
import { Repository } from "typeorm";
import { IHotelDataProvider } from "../adapters/hotel-data-provider.adapter";
import { IngestHotelsFromHereCommand } from "../commands/ingest-hotels-from-here.command";
import { HotelEntity } from "../entities/hotel.entity";
import { IngestHotelsFromHereCommandHandler } from "../handlers/commands/ingest-hotels-from-here-command.handler";
import { HereHotelDataProviderService } from "../services/here-hotel-data-provider.service";



describe('HERE:Hotels-Ingest-Handler', () => {
    let hereDataIngestHandler: IngestHotelsFromHereCommandHandler;

    beforeEach(async () => {
      const app = await Test.createTestingModule({
        imports: [],
        providers: [
          {
            provide: 'HERE_INGEST_COMMAND_HANDLER',
            useFactory: () =>
              new IngestHotelsFromHereCommandHandler(
                [HereHotelDataProviderService] as unknown as IHotelDataProvider[],
                { upsert: jest.fn(),
                 } as unknown as Repository<HotelEntity>,
              ),
          },
        ],
      }).compile();
  
      hereDataIngestHandler = app.get('HERE_INGEST_COMMAND_HANDLER');
    });
  
    describe('HERE:Ingest Handler: Init', () => {
      test('should be initialized successfully', async () => {
        await expect(hereDataIngestHandler).toBeDefined();
      });

      test('should be able to execute handler', async () => {
        await expect(hereDataIngestHandler.execute(new IngestHotelsFromHereCommand(10,10,200 ))).rejects.toBeDefined();
      });

      
    });
  });
  