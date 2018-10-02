import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './logger/logger.service';
import { ConfigService } from './config/config.service';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = await app.get<LoggerService>(LoggerService);
  const config = await app.get<ConfigService>(ConfigService);

  await app.init();
  await app.listen(config.getPort());
  logger.info(`Service running on port ${config.getPort()}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
