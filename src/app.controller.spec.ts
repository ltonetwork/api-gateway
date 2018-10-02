import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './app.module';
import { ProxyController } from './proxy/proxy.controller';

describe('AppController', () => {
  let app: TestingModule;
  let appService: AppService;

  beforeAll(async () => {
    app = await Test.createTestingModule(AppConfigModule).compile();
    await app.init();

    appService = app.get<AppService>(AppService);
  });

  afterAll(() => {
    app.close();
  });

  describe('info', () => {
    it('should return the service info', () => {
      const appController = app.get<AppController>(AppController);
      const result = { name: 'foo' };
      jest.spyOn(appService, 'info').mockImplementation(() => result);
      expect(appController.info()).toEqual({ name: 'foo' });
    });
  });
});
