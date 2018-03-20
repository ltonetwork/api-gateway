'use strict';
const httpProxy = require('http-proxy');
const logger = require('../lib/logger');
const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const config = require('config');
const ApiConverter = require('../lib/api-converter');

// API Proxy
const proxy = httpProxy.createProxyServer({
  xfwd: true
});

proxy.on('proxyReq', (proxyReq, req, res, options) => {
  proxyReq.setHeader('Host', options.target.host);
  proxyReq.setHeader('X-Forwarded-Url', req.originalUrl);
});

router.use('/', (req, res, next) => {
  const orgUrl = req.url.replace(/\/$/, '');
  const api = orgUrl.replace(/^\/([^\/]+)(\/.*)?$/, '$1');
  req.url = req.url.replace(/^\/[^\/]+/, '') || '/'; // eslint-disable-line no-param-reassign

  const apiConverter = new ApiConverter(config);

  if (!apiConverter.exists(api)) {
    logger.warn(`API: ${api} not found`);
    res.status(404).send('API Not Found!');
    return;
  }

  const url = apiConverter.getUrl(api, req.app.get('environment'));
  if (!url) {
    return next();
  }

  logger.debug('Forward to url: %s', url);

  proxy.web(req, res, {
    target: url
  }, (e) => {
    logger.warn(`Failed to connect to API  ${url} : ${e}`);
    next(`Failed to connect to API  ${url} : ${e}`);
  });
});

module.exports = router;