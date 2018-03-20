'use strict';
const config = require('config');

/* Redirect all requests to https */
module.exports = (req, res, next) => {

  if (config.get('ssl') && !req.secure && req.headers['x-forwarded-proto'] !== 'https') {
    const url = `https://${req.headers.host.replace(/:\d+$/, '')}${req.url}`;

    res.writeHead(301, {
      Location: url,
      'Content-Type': 'text/html',
    });
    res.end(`You\'re being redirected to <a href="${url}">${url}</a>`);

    return;
  }

  next();
};
