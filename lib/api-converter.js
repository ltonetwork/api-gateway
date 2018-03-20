const dns = require('dns');

class APIConverter {

  constructor(config) {
    this.defaultApi = config.get('default_api');

    const services = config.get('services');
    this.apis = {};

    for(let service of services) {
      this.apis[service.id] = this.defaultApi.replace('{api}', service.domain);
    }
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
}

 module.exports = APIConverter;