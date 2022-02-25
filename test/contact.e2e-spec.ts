import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, CanActivate } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { JwtAuthGuard } from '../src/user/jwt.guard';

describe('ContactController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const mockJwtAuthGuard: CanActivate = {
      canActivate: jest.fn(() => true),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtAuthGuard)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/contacts (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/contacts')
      .send({
        name: 'pinke_create_name',
        phone: '0900-000-999',
      })
      .expect(HttpStatus.CREATED)
      .expect((rawData) => {
        const data = rawData.body;
        expect(data.name).toEqual('pinke_create_name');
        expect(data.phone).toEqual('0900-000-999');
      });
  });

  it('/api/contacts (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/contacts')
      .query('page=1')
      .query('perPage=1')
      .expect(HttpStatus.OK)
      .expect((rawData) => {
        const data = rawData.body;
        expect(data.page).toEqual(1);
        expect(data.perPage).toEqual(1);
        expect(data.data.length).toEqual(1);
      });
  });

  it('/api/contacts/{contact_id} (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/contacts/1')
      .expect(HttpStatus.OK)
      .expect((rawData) => {
        const data = rawData.body;
        expect(data.id).toEqual(1);
        expect(data.name).toEqual('Pinke');
        expect(data.phone).toEqual('0905-000-888');
      });
  });

  it('/api/contacts/2 (PUT)', () => {
    return request(app.getHttpServer())
      .put('/api/contacts/2')
      .send({
        name: 'pinke_update_name',
        phone: '0900-000-888',
      })
      .expect(HttpStatus.OK)
      .expect((rawData) => {
        const data = rawData.body;
        expect(data.name).toEqual('pinke_update_name');
        expect(data.phone).toEqual('0900-000-888');
      });
  });

  it('/api/contacts/2 (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/api/contacts/2')
      .expect(HttpStatus.OK);
  });

  afterAll(async () => {
    await app.close();
  });
});
