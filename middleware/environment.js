'use strict';
const dns = require('dns');
const cache = require('../lib/cache');
const logger = require('../lib/logger');
const config = require('config');

/**
 * Get the application environment name
 *
 * This is determined by the subdomain of the primary domain (eg `foo.legalthings.io` => `foo`)
 * If the host is not a subdomain of the primary domain, it should be a CNAME to it.
 */
const getApplicationEnv = (host) => {
  const primaryDomain = config.get('primary_domain');
  const aliases = config.get('aliases');

  return new Promise((resolve, reject) => {
    const done = (target) => {
      if (host === primaryDomain) {
        target = 'www'; // eslint-disable-line no-param-reassign
      }
      if (aliases[target]) {
        target = aliases[target]; // eslint-disable-line no-param-reassign
      }

      resolve(target);
    };

    const domainEscaped = primaryDomain.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    const domainRegExp = new RegExp(`\\.${domainEscaped}(:\\d+)?$`);

    if (host.startsWith('127.0.0.1') || host.startsWith('localhost')) {
      host = 'localhost'; // eslint-disable-line no-param-reassign
    }
    if (host === primaryDomain || host.match(domainRegExp)) {
      return done(host.replace(domainRegExp, ''));
    }

    cache.get(`env:${host}`, (err1, result) => {
      if (err1) {
        return reject(err1);
      }

      // Cache hit
      if (result) {
        return done(result);
      }

      // Not cached? Resolve DNS
      dns.resolveCname(host, (err, cname) => {
        if (err) {
          return reject(`no app env for ${host} : ${err}`);
        }

        if (typeof cname === 'object') {
          cname = cname[0]; // eslint-disable-line no-param-reassign
        }
        if (!cname.match(domainRegExp)) {
          return reject(`no app env: invalid CNAME: ${cname}`);
        }

        const target = cname.replace(domainRegExp, '');

        cache.set(`env:${host}`, target);
        done(target);
      });
    });
  });
};

/* Based on the hostname and cname used check which environment should be called */
module.exports = (req, res, next) => {
  const host = req.headers.host.replace(/^www\.|:\d+$/, '');

  getApplicationEnv(host).then((env) => {
    req.app.set('environment', env);
    next();
  }).catch((err) => {
    console.log(err);
    next();
  })
};