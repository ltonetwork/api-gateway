const request = require('request-promise');
const Promise = require('bluebird');
const APIConverter = require('./api-converter');

class Services {

  constructor(config) {
    this.apiConverter = new APIConverter(config);
  }

  async getAllServicesInfo(env) {
    const apis = this.apiConverter.getAllUrls(env);



    const promises = {};
    for(const api in apis) {
      promises[api] = request({url: apis[api], json: true});
    }

    return Promise.props(promises);
  }
}

module.exports = Services;