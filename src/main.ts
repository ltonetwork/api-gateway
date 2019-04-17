import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './logger/logger.service';
import { ConfigService } from './config/config.service';
import cors from 'cors';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });
  const logger = await app.get<LoggerService>(LoggerService);
  const config = await app.get<ConfigService>(ConfigService);

  app.use(cors());
  app.use(helmet());

  await app.init();
  await app.listen(config.getPort());
  logger.info(`Service running on port ${config.getPort()}`);
}
bootstrap();
