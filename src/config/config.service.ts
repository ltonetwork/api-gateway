import { Injectable } from '@nestjs/common';
import { ConfigLoaderService } from './config-loader.service';

@Injectable()
export class ConfigService {
  constructor(private readonly config: ConfigLoaderService) {}

  getEnv(): string {
    return this.config.get('env');
  }

  getPort(): number {
    return this.config.get('port');
  }

  getDefaultApi(): string {
    return this.config.get('webserver.default_api');
  }

  getServices(): Array<any> {
    return this.config.get('webserver.services');
  }

  getEndPoints(): any {
    return this.config.get('webserver.endpoints');
  }

  getNoAuthRoutes(): Array<any> {
    return this.config.get('webserver.noauth');
  }

  getLoggerGlobal(): { level } {
    return this.config.get('log');
  }

  getLoggerConsole(): { level } {
    const config = this.getLoggerGlobal();

    if (config.level) {
      return config;
    }

    return this.config.get('webserver.logger.console');
  }

  getLoggerCombined(): { level } {
    const config = this.getLoggerGlobal();

    if (config.level) {
      return config;
    }

    return this.config.get('webserver.logger.combined');
  }

  getCors(): any {
    const credentials = this.config.get('cors.credentials') || false;
    const exposedHeaders = this.config.get('cors.exposed_headers') || [];
    const allowedHeaders = this.config.get('cors.allowed_headers') || [];

    return {
      credentials,
      exposedHeaders,
      allowedHeaders,
    };
  }

  isSSLEnabled(): boolean {
    return this.config.get('ssl.enabled');
  }
}
