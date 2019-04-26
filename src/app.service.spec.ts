import { Test, TestingModule } from '@nestjs/testing';
import { AppConfigModule } from './app.module';
import { AppService } from './app.service';
import { ProxyService } from './proxy/proxy.service';
import { HttpService } from '@nestjs/common';

describe('AppService', () => {
  let app: TestingModule;
  let appService: AppService;
  let proxyService: ProxyService;
  let httpService: HttpService;

  beforeEach(async () => {
    app = await Test.createTestingModule(AppConfigModule).compile();
    await app.init();

    httpService = app.get<HttpService>(HttpService);
    proxyService = app.get<ProxyService>(ProxyService);
    appService = app.get<AppService>(AppService);
  });

  afterEach(() => {
    app.close();
  });

  describe('info', () => {
    it('should return correct service info', async () => {
      const services = {
        foo: {
          name: 'foo',
        },
      };

      const expected = {
        description: 'LTO Network - API Gateway',
        name: 'lto-api-gateway',
        services,
      };
      jest
        .spyOn(appService, 'getAllServicesInfo')
        .mockImplementation(() => Promise.resolve(services));

      expect(await appService.info()).toMatchObject(expected);
    });
  });

  describe('getAllServicesInfo', () => {
    it('should return all info from all services', async () => {
      const urls = {
        foo: 'http://foo',
        bar: 'http://bar',
        test: 'http://test',
      };

      jest.spyOn(proxyService, 'getAllUrls').mockImplementation(() => urls);
      jest
        .spyOn(httpService, 'get')
        .mockImplementationOnce(() => ({
          toPromise: () => Promise.resolve({ data: { name: 'foo' } }),
        }) as any);
      jest
        .spyOn(httpService, 'get')
        .mockImplementationOnce(() => ({
          toPromise: () => Promise.resolve({ data: { name: 'bar' } }),
        }) as any);
      jest
        .spyOn(httpService, 'get')
        .mockImplementationOnce(() => ({
          toPromise: () => Promise.resolve({ data: { name: 'test' } }),
        }) as any);

      expect(await appService.getAllServicesInfo('env')).toMatchObject({
        foo: {
          name: 'foo',
        },
        bar: {
          name: 'bar',
        },
        test: {
          name: 'test',
        },
      });
    });
  });
});
