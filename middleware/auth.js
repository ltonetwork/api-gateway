'use strict';
const config = require('config');
const logger = require('../lib/logger');
const HTTPSignature = require('lto-api').HTTPSignature;
const Request = require('lto-api').Request;

// Give a unauthorized response
function unauthorized(res, err, msg) {
  logger.debug(err);
  res.writeHead(401, { 'Content-Type': 'text/plain' });
  res.end(msg);
  return;
}

function urlShouldAuth(url) {
  const noAuth = config.get('noAuth');

  if (!noAuth) return true;

  for (let i = 0; i < noAuth.length; i++) {
    const regexp = new RegExp(`^${noAuth[i].replace(/\/$/, '')}(/|\\?|$)$`);
    if (regexp.exec(url)) {
      return false;
    }
  }

  return true;
}

function checkRequestSession(req) {

  /*if (!req.headers.authorization || req.headers.authorization.indexOf('Bearer') === -1) {
    return false;
  }*/

  try {
    const request = new Request(req.originalUrl, req.method, req.headers, req.body);
    const httpSign = new HTTPSignature(request);

    const res = httpSign.verify();
    return res;
  } catch (ex) {
    logger.debug(req.headers);
    logger.debug(ex.toString());
    return false;
  }
}

// Verify session with IAM
module.exports = (req, res, next) => {
  const orgUrl = req.url.replace(/\/$/, '');

  const api = orgUrl.replace(/^\/([^\/]+)(\/.*)?$/, '$1');

  if (!urlShouldAuth(orgUrl)) {
    return next();
  }

  if (!checkRequestSession(req)) {
    return unauthorized(res, `Request to ${api}  denied: no session`, 'not authenticated');
  }

  next();
};