import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { Request, Response } from 'express';
import ProxyServer from 'http-proxy';
type ProxyServerType = typeof ProxyServer;
import { LoggerService } from '../logger/logger.service';
import { PROXYSERVER } from '../constants';

@Injectable()
export class ProxyService {
  private defaultApi: string;
  private apis: any;
  private endpoints: any;
  public proxyServer: ProxyServer;

  constructor(
    private readonly config: ConfigService,
    private readonly logger: LoggerService,
    @Inject(PROXYSERVER) private readonly _ProxyServer: ProxyServerType,
  ) {}

  async onModuleInit() {
    this.defaultApi = this.config.getDefaultApi();

    const services = this.config.getServices();
    this.apis = {};

    for (const service of services) {
      this.apis[service.id] = this.defaultApi.replace('{api}', service.domain);
    }

    this.endpoints = this.config.getEndPoints();

    this.proxyServer = this._ProxyServer.createProxyServer({
      xfwd: true,
    });
    this.proxyServer.on('proxyReq', (proxyReq, req: Request, res: Response, options: any) => {
      proxyReq.setHeader('Host', options.target.host);
      proxyReq.setHeader('X-Forwarded-Url', req.originalUrl);
    });
  }

  async onModuleDestroy() {
    this.proxyServer.close();
  }

  async proxy(req: Request, res: Response): Promise<boolean> {
    const orgUrl = req.originalUrl.replace(/\/$/, '');
    const endpoint = orgUrl.replace(/^\/([^\/]+)(\/.*)?$/, '$1');

    if (!this.endpoints.hasOwnProperty(endpoint)) {
      return false;
    }

    const api = this.getEndpointService(endpoint);

    const url = this.getUrl(api, req.app.get('environment'));
    if (!url) {
      res.status(500).send('Invalid service configuration');
      return true;
    }

    this.logger.debug(`Forward to url: ${url}`);

    this.proxyServer.web(req, res, {
      target: url,
    }, (e) => {
      this.logger.warn(`Failed to connect to API  ${url} : ${e}`);
      res.status(500).send(`Failed to connect to API  ${url} : ${e}`);
      return true;
    });

    return true;
  }

  /**
   * Check if an API exists
   */
  exists(api) {
    return this.apis.hasOwnProperty(api);
  }

  /**
   * Get the URL of an api
   */
  getUrl(api, env) {
    if (!this.apis.hasOwnProperty(api)) {
      return null;
    }

    return this.apis[api].replace('{env}', env);
  }

  /**
   * Get all API urls
   */
  getAllUrls(env) {
    const urls = {};
    for (const api in this.apis) {
      urls[api] = this.apis[api].replace('{env}', env);
    }
    return urls;
  }

  getEndpointService(endpoint): string | null {
    if (!this.endpoints.hasOwnProperty(endpoint)) {
      return null;
    }
    return this.endpoints[endpoint];
  }

  protected getApis(): any {}
}
