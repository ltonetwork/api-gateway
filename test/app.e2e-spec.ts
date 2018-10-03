import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { AppService } from '../src/app.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let appService: AppService;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    appService = app.get<AppService>(AppService);
  });

  afterAll(() => {
    app.close();
  });

  it('/ (GET)', async () => {
    const services = {
      foo: {
        name: 'foo',
      },
    };

    const expected = {
      description: 'LTO Webserver',
      name: 'lto-webserver',
      services,
    };
    jest.spyOn(appService, 'getAllServicesInfo').mockImplementation(() => services);
    const res = await request(app.getHttpServer()).get('/');
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject(expected);
  });
});
