import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { LoggerModule } from '../logger/logger.module';
import { ProxyService } from './proxy.service';
import { ProxyController } from './proxy.controller';
import { proxyProviders } from './proxy.providers';

export const ProxyModuleConfig = {
  imports: [
    ConfigModule,
    LoggerModule,
  ],
  controllers: [ProxyController],
  providers: [
    ...proxyProviders,
    ProxyService,
  ],
  exports: [
    ...proxyProviders,
    ProxyService,
  ],
};

@Module(ProxyModuleConfig)
export class ProxyModule { }
