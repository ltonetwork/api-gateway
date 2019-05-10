import { Module } from '@nestjs/common';
import { ToolsController } from './tools.controller';
import { ToolsService } from './tools.service';

export const ToolsModuleConfig = {
  controllers: [
    ToolsController,
  ],
  providers: [
    ToolsService,
  ],
  exports: [
    ToolsService,
  ],
};

@Module(ToolsModuleConfig)
export class ToolsModule { }
