import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModuleConfig } from './config.module';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let module: TestingModule;
  let configService: ConfigService;

  beforeEach(async () => {
    module = await Test.createTestingModule(ConfigModuleConfig).compile();
    await module.init();

    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(async () => {
    await module.close();
  });

  describe('get config', () => {
    test('getEnv()', async () => {
      expect(configService.getEnv()).toBe('test');
    });

    test('getPort()', async () => {
      expect(configService.getPort()).toBe(80);
    });

    test('getServices()', () => {
      expect(configService.getServices()).toEqual([
        {
          id: 'flow',
          domain: 'legalflow',
        },
        {
          id: 'events',
          domain: 'legalevents',
        },
        {
          id: 'queuer',
          domain: 'event-queuer',
        },
      ]);
    });

    test('getNoAuthRoutes', () => {
      expect(configService.getNoAuthRoutes()).toEqual([
        '/flow',
        '/events',
        '/queuer',
      ]);
    });

    test('getLoggerGlobal()', async () => {
      expect(configService.getLoggerGlobal()).toEqual({ level: '' });
    });

    test('getLoggerConsole()', async () => {
      expect(configService.getLoggerConsole()).toEqual({ level: 'info' });

      configService.getLoggerGlobal = jest.fn(() => ({ level: 'debug' }));
      expect(configService.getLoggerConsole()).toEqual({ level: 'debug' });
    });

    test('getLoggerCombined()', async () => {
      expect(configService.getLoggerCombined()).toEqual({ level: 'info' });

      configService.getLoggerGlobal = jest.fn(() => ({ level: 'debug' }));
      expect(configService.getLoggerCombined()).toEqual({ level: 'debug' });
    });
  });
});
