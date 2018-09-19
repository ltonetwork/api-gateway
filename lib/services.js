const request = require('request-promise');
const APIConverter = require('./api-converter');

class Services {

  constructor(config) {
    this.apiConverter = new APIConverter(config);
  }

  async getAllServicesInfo(env) {
    const apis = this.apiConverter.getAllUrls(env);
    const promises = [];
    for(const api of apis) {
      promises.push(request({url: api, json: true}));
    }

    return Promise.all(promises);
  }
}

module.exports = Services;