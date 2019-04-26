import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { SSLService } from './ssl.service';

@Injectable()
export class SSLMiddleware implements NestMiddleware {
  constructor(private readonly ssl: SSLService) {}

  use(req: Request, res: Response, next: NextFunction) {

    if (this.ssl.shouldRedirect(req)) {
      const url = `https://${req.headers.host.replace(/:\d+$/, '')}${req.url}`;

      res.writeHead(301, {
        'Location': url,
        'Content-Type': 'text/html',
      });
      res.end(`You\'re being redirected to <a href="${url}">${url}</a>`);

      return;
    }

    next();
  }
}