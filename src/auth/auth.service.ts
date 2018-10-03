import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { Request } from 'express';
import { Request as LTORequest, HTTPSignature } from 'lto-api';
type HTTPSignatureType = typeof HTTPSignature;
import { HTTPSIGNATURE } from '../constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    @Inject(HTTPSIGNATURE) private readonly _HTTPSignature: HTTPSignatureType,
  ) {}

  shouldAuthenticateRoute(originUrl: string): boolean {
    const noAuth = this.config.getNoAuthRoutes();

    if (!noAuth) return true;

    for (let i = 0; i < noAuth.length; i++) {
      const regexp = new RegExp(`^${noAuth[i].replace(/\/$/, '')}(/|\\?|$)$`);
      if (regexp.exec(originUrl)) {
        return false;
      }
    }

    return true;
  }

  authenticate(req: Request): boolean {
    try {
      const request = new LTORequest(req.originalUrl, req.method, req.headers, req.body);
      const httpSign = new this._HTTPSignature(request);

      const res = httpSign.verify();
      return res;
    } catch (ex) {
      throw new HttpException(ex.message, 401);
      // return false;
    }
  }
}
