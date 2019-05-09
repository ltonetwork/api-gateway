import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './logger/logger.service';
import { ConfigService } from './config/config.service';
import { NestExpressApplication } from '@nestjs/platform-express';
import cors from 'cors';
import helmet from 'helmet';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: false,
    cors: true,
  });
  const logger = await app.get<LoggerService>(LoggerService);
  const config = await app.get<ConfigService>(ConfigService);

  app.useStaticAssets(join(__dirname, '../public'));

  await app.init();

  app.use(cors(await config.getCors()));
  app.use(helmet());

  await app.listenAsync(config.getPort());
  logger.info(`Service running on port ${config.getPort()}`);
}
bootstrap();
