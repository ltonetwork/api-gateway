import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { Request } from 'express';

@Injectable()
export class SSLService {
  constructor(
    private readonly config: ConfigService,
  ) {}

  public shouldRedirect(req: Request): boolean {
    return this.config.isSSLEnabled() && this.isNotLocal(req) && this.isNotSecure(req);
  }

  protected isNotLocal(req: Request): boolean {
    return req.hostname !== 'localhost';
  }

  protected isNotSecure(req: Request): boolean {
    return !req.secure && req.headers['x-forwarded-proto'] !== 'https';
  }
}
