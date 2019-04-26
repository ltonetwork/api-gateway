import { Test, TestingModule } from '@nestjs/testing';
import { SSLMiddleware } from './ssl.middleware';
import { SSLService } from './ssl.service';
import { SSLModuleConfig } from './ssl.module';
import { NestApplication } from '@nestjs/core';
import { ConfigService } from '../config/config.service';
import request from 'supertest';
import httpMocks from 'node-mocks-http';

describe('SSLMiddleware', () => {
  let app: NestApplication;
  let module: TestingModule;
  let sslMiddleware: SSLMiddleware;
  let sslService: SSLService;
  let configService: ConfigService;

  beforeEach(async () => {
    module = await Test.createTestingModule(SSLModuleConfig).compile();
    await module.init();

    sslMiddleware = module.get<SSLMiddleware>(SSLMiddleware);
    sslService = module.get<SSLService>(SSLService);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    module.close();
  });

  describe('use', () => {
    it('should return a redirect response when a non-secure request is received', async () => {
      jest.spyOn(configService, 'isSSLEnabled').mockImplementation(() => true);
      jest.spyOn(sslService, 'shouldRedirect').mockImplementation(() => true);

      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/',
        headers: {
          host: 'example.com',
        },
      });
      const res = httpMocks.createResponse();
      const next = jest.fn();
      sslMiddleware.use(req, res, next);
      expect(res.statusCode).toBe(301);
      expect(res.getHeader('Location')).toBe('https://example.com/');
      expect(next.mock.calls.length).toBe(0);
    });

    it('should return a redirect response when a non-secure request is received', async () => {
      jest.spyOn(configService, 'isSSLEnabled').mockImplementation(() => true);
      jest.spyOn(sslService, 'shouldRedirect').mockImplementation(() => false);

      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/',
        headers: {
          host: 'example.com',
        },
      });
      const res = httpMocks.createResponse();
      const next = jest.fn();
      sslMiddleware.use(req, res, next);
      expect(next.mock.calls.length).toBe(1);
    });
  });
});