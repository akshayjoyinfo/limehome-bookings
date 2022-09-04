import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('HereHotelsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    process.env['DB_URL']='postgres://postgres:Password@2020@localhost:5432/limehomebookingse2e'
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async ()=>{
    console.log("After All HereHotelsController");
    await app.close()
});


  it('/here-hotels?longitude=-71.05495&latitude=42.36309&distance=500 (POST)', async () => {
    return await request(app.getHttpServer())
      .post('/here-hotels?longitude=-71.05495&latitude=42.36309&distance=500')
      .expect(201);
  });

  it('/here-hotels?longitude=-71.05495&latitude=42.36309&distance=500 (POST) rengest', async () => {
    return await request(app.getHttpServer())
      .post('/here-hotels?longitude=-71.05495&latitude=42.36309&distance=500')
      .expect(201);
  });


});
