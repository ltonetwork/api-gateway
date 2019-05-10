import { Get, Controller, Res, Req, Next } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { Response } from 'express';
import { join } from 'path';

@Controller()
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @Get('viewer')
  public serveChainViewer(@Res() res: Response) {
    res.sendFile(join(__dirname, '../../public/viewer/index.html'));
  }

  @Get('viewer/:page')
  public serveChainViewerSubPage(@Res() res: Response) {
    res.sendFile(join(__dirname, '../../public/viewer/index.html'));
  }

  @Get('playground')
  public servePlayground( @Res() res: Response) {
    res.sendFile(join(__dirname, '../../public/playground/index.html'));
  }
}
