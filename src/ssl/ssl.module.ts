import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { LoggerModule } from '../logger/logger.module';
import { SSLMiddleware } from './ssl.middleware';
import { SSLService } from './ssl.service';

export const SSLModuleConfig = {
  imports: [
    ConfigModule,
    LoggerModule,
  ],
  providers: [
    SSLMiddleware,
    SSLService,
  ],
  exports: [
    SSLMiddleware,
    SSLService,
  ],
};

@Module(SSLModuleConfig)
export class SSLModule { }