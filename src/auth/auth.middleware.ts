import {
  Injectable,
  NestMiddleware,
  MiddlewareFunction,
  HttpException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '../config/config.service';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly config: ConfigService,
    private readonly logger: LoggerService,
    private readonly authService: AuthService,
  ) {}

  resolve(...args: any[]): MiddlewareFunction {
    return this.authenticate.bind(this);
  }

  authenticate(req, res, next) {
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
