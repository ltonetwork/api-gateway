import { Test, TestingModule } from '@nestjs/testing';
import { ProxyService } from './proxy.service';
import { ProxyModuleConfig } from './proxy.module';
import { PROXYSERVER } from '../constants';
import httpMocks from 'node-mocks-http';
import { ConfigService } from '../config/config.service';

describe('ProxyService', () => {
  let module: TestingModule;
  let proxyService: ProxyService;
  let configService: ConfigService;

  const ProxyServer = {
    createProxyServer: jest.fn().mockImplementation(() => ({
      on: jest.fn(),
      web: jest.fn(),
      close: jest.fn(),
    })),
  };

  beforeEach(async () => {
    module = await Test.createTestingModule(ProxyModuleConfig)
      .overrideProvider(PROXYSERVER)
      .useValue(ProxyServer)
      .compile();
    await module.init();

    proxyService = module.get<ProxyService>(ProxyService);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    module.close();
  });

  describe('proxy', () => {
    it('proxy a request to service', async () => {
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/processes/1',
        app: {
          get: () => 'test',
        },
      });
      const res = httpMocks.createResponse();
      const next = jest.fn();

      const processed = await proxyService.proxy(req, res);

      expect(processed).toBeTruthy();

      expect(req.url).toBe('/processes/1');
      const spyWeb = jest.spyOn(proxyService.proxyServer, 'web');
      expect(spyWeb.mock.calls.length).toBe(1);
      expect(spyWeb.mock.calls[0][2].target).toBe('http://legalflow');
      expect(next.mock.calls.length).toBe(0);
    });

    it('proxy should not proxy a request if the api doesn\'t exist', async () => {
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/test/test',
        app: {
          get: () => 'test',
        },
      });
      const res = httpMocks.createResponse();

      const processed = await proxyService.proxy(req, res);
      expect(processed).toBeFalsy();
    });
  });

  describe('exists', () => {
    it('should return true for configured urls', () => {
      expect(proxyService.exists('flow')).toBeTruthy();
    });

    it('should return false for non configured urls', () => {
      expect(proxyService.exists('no-api')).toBeFalsy();
    });
  });

  describe('getUrl', () => {
    it('should enrich the url with the env parameter', () => {
      expect(proxyService.getUrl('flow', 'foo')).toBe('http://legalflow');
    });
  });

  describe('getAllUrls', () => {
    it('should return all the urls configured', async () => {
      const services = [
        {
          id: 'flow',
          domain: 'legalflow.{env}',
        },
        {
          id: 'events',
          domain: 'legalevents.{env}',
        },
        {
          id: 'queuer',
          domain: 'queuer.{env}',
        },
      ];
      jest.spyOn(configService, 'getServices').mockImplementation(() => services);
      await module.init();

      const expected = {
        flow: 'http://legalflow.foo',
        events: 'http://legalevents.foo',
        queuer: 'http://queuer.foo',
      };

      expect(proxyService.getAllUrls('foo')).toEqual(expected);
    });
  });
});
