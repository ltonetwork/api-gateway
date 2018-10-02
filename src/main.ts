import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './logger/logger.service';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });
  const logger = await app.get<LoggerService>(LoggerService);
  const config = await app.get<ConfigService>(ConfigService);

  await app.init();
  await app.listen(config.getPort());
  logger.info(`Service running on port ${config.getPort()}`);
}
bootstrap();
