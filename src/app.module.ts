import { HttpModule, MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './logger/logger.module';
import { ConfigModule } from './config/config.module';
import { ProxyModule } from './proxy/proxy.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { ProxyController } from './proxy/proxy.controller';
import { AuthModule } from './auth/auth.module';

export const AppConfigModule = {
  imports: [
    HttpModule,
    ProxyModule,
    LoggerModule,
    ConfigModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
};

@Module(AppConfigModule)
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(ProxyController);
  }
}