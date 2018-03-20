'use strict';

const cacheManager = require('cache-manager');

module.exports = cacheManager.caching({
  store: 'memory',
  ttl: 60
});