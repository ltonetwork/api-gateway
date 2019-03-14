import { Controller, All, Next, Req, Res } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ProxyService } from './proxy.service';

@Controller('*')
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @All()
  async proxy(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction): Promise<void> {
    const processed = await this.proxyService.proxy(req, res);
    if (!processed) {
      next();
    }
  }
}
