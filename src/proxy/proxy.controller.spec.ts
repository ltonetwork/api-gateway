import { Test, TestingModule } from '@nestjs/testing';
import { ProxyModuleConfig } from './proxy.module';
import { ProxyService } from './proxy.service';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { Request, Response } from 'express';

describe('ProxyController', () => {
  let app: INestApplication;
  let module: TestingModule;
  let proxyService: ProxyService;

  beforeEach(async () => {
    module = await Test.createTestingModule(ProxyModuleConfig).compile();
    app = module.createNestApplication();
    await app.init();

    proxyService = module.get<ProxyService>(ProxyService);
  });

  afterEach(() => {
    module.close();
  });

  describe('proxy', () => {
    it('should proxy a request to right service', async () => {
      const result = {id: 'foo'};
      jest.spyOn(proxyService, 'proxy').mockImplementation((req: Request, proxyRes: Response) => {
        proxyRes.status(200).json({ id: 'foo'});
      });

      const res = await request(app.getHttpServer())
        .get('/api/flow/processes/1')
        .send();

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ id: 'foo'});
    });
  });
});