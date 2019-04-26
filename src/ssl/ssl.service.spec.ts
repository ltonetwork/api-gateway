import { Test, TestingModule } from '@nestjs/testing';
import { SSLService } from './ssl.service';
import { SSLModuleConfig } from './ssl.module';
import httpMocks from 'node-mocks-http';
import { ConfigService } from '../config/config.service';

describe('SSLService', () => {
  let module: TestingModule;
  let sslService: SSLService;
  let configService: ConfigService;

  beforeEach(async () => {
    module = await Test.createTestingModule(SSLModuleConfig)
      .compile();
    await module.init();

    sslService = module.get<SSLService>(SSLService);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(async () => {
    await module.close();
  });

  describe('shouldRedirect', () => {
    it('should return false if ssl is disabled request', () => {
      jest.spyOn(configService, 'isSSLEnabled').mockImplementation(() => false);

      const req = httpMocks.createRequest({
        hostname: 'example.com',
        method: 'GET',
        url: '/',
        app: {
          get: () => 'test',
        },
      });

      expect(sslService.shouldRedirect(req)).toBeFalsy();
    });

    it('should return false is hosname is localhost request', () => {
      jest.spyOn(configService, 'isSSLEnabled').mockImplementation(() => true);

      const req = httpMocks.createRequest({
        hostname: 'localhost',
        method: 'GET',
        url: '/',
        app: {
          get: () => 'test',
        },
      });

      expect(sslService.shouldRedirect(req)).toBeFalsy();
    });

    it('should return true if it\'s an unsecure and not localhost request', () => {
      jest.spyOn(configService, 'isSSLEnabled').mockImplementation(() => true);

      const req = httpMocks.createRequest({
        hostname: 'example.com',
        method: 'GET',
        url: '/',
        app: {
          get: () => 'test',
        },
      });

      expect(sslService.shouldRedirect(req)).toBeTruthy();
    });
  });
});