import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { AuthService } from './auth.service';
import { authProviders } from './auth.providers';
import { AuthMiddleware } from './auth.middleware';
import { LoggerModule } from '../logger/logger.module';

export const AuthModuleConfig = {
  imports: [
    ConfigModule,
    LoggerModule,
  ],
  providers: [
    ...authProviders,
    AuthService,
    AuthMiddleware,
  ],
  exports: [
    ...authProviders,
    AuthService,
    AuthMiddleware,
  ],
};

@Module(AuthModuleConfig)
export class AuthModule { }