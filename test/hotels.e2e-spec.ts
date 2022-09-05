import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateHotelBookingRequest } from '../src/models/request/hotel-booking-request.dto';
import { getConnection } from 'typeorm';

describe('HotelsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    process.env['DB_URL'] =
      'postgres://postgres:Password@2020@localhost:5432/limehomebookings';
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const entities = getConnection().entityMetadatas;
    for (const entity of entities) {
      const repository = await getConnection().getRepository(entity.name);
      if (
        entity.tableName === 'bookings' ||
        entity.tableName === 'booking_allocations'
      )
        await repository.query(
          `TRUNCATE ${entity.tableName} RESTART IDENTITY CASCADE;`,
        );
    }
  });

  afterAll(async () => {
    console.log('After All HotelsController');
    await app.close();
  });

  it('/here-hotels?longitude=-71.05495&latitude=42.36309&distance=500 (POST)', async () => {
    return await request(app.getHttpServer())
      .post('/here-hotels?longitude=-71.05495&latitude=42.36309&distance=500')
      .expect(201);
  });

  it('/hotels (GET) Limehome Search Hotels', async () => {
    return await request(app.getHttpServer())
      .get('/hotels?longitude=-71.05495&latitude=42.36309')
      .expect(200);
  });

  it('/hotels (POST) Limehome Hotels Booking `-10 times', async () => {
    const bookingPayload: CreateHotelBookingRequest = require('./payloads/create-booking-payload.json');

    const appExec = await request(app.getHttpServer());

    var iterations = Array.from({ length: 10 }, (_, i) => i + 1);
    iterations.forEach((it) => {
      let bookingReponse = appExec
        .post('/hotels/1')
        .send(bookingPayload)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(201)
    });


     appExec
        .post('/hotels/1')
        .send(bookingPayload)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(400)

  });


});
