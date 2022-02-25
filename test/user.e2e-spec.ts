import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/users/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/users/login')
      .send({
        account: 'pinke',
        password: '12345678',
      })
      .expect(HttpStatus.CREATED)
      .expect((rawData) => {
        const data = rawData.body;
        expect(data.name).toEqual('Pinke');
        expect(data.email).toEqual('pinke.yu@ailabs.tw');
        expect(data.token).toBeTruthy();
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
