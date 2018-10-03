import { Controller, All, Next, Req, Res } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ProxyService } from './proxy.service';

@Controller('api')
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @All()
  async proxy(@Req() req: Request, @Res() res: Response): Promise<void> {
    await this.proxyService.proxy(req, res);
  }
}
