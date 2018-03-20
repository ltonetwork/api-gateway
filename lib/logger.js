const winston = require('winston');
const config = require('config');

const loglevel = process.env.LOGLEVEL || 'warn';
const transports = [
  new (winston.transports.Console)({
    timestamp: true,
    level: loglevel
  }),
];

module.exports = new (winston.Logger)({
  transports
});