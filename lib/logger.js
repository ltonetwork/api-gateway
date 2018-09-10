const winston = require('winston');
const config = require('config');

const loglevel = config.get('loglevel');
const transports = [
  new (winston.transports.Console)({
    timestamp: true,
    level: loglevel
  }),
];

module.exports = new (winston.Logger)({
  transports
});