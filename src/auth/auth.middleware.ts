import {
  Injectable,
  NestMiddleware,
  HttpException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '../config/config.service';
import { LoggerService } from '../logger/logger.service';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly config: ConfigService,
    private readonly logger: LoggerService,
    private readonly authService: AuthService,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const orgUrl = req.url.replace(/\/$/, '');

    const api = orgUrl.replace(/^\/([^\/]+)(\/.*)?$/, '$1');

    if (!this.authService.shouldAuthenticateRoute(orgUrl)) {
      this.logger.debug('No authentication required');
      return next();
    }

    if (!this.authService.authenticate(req)) {
      throw new HttpException(
        `Request to ${api}  denied: invalid session`,
        401,
      );
    }

    next();
  }
}
