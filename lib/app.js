'use strict';
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const log = require('./logger');
const data = require('../package');
const config = require('config');
const Services = require('./services');
const services = new Services(config);

// Setup express app
const app = express();

app.enable('trust proxy');

log.stream = {
  write: (message) => {
    log.info(message);
  },
};
app.use(morgan('combined', { stream: log.stream }));

app.use(helmet({ hsts: { setIf: (req) => req.secure || (req.headers['x-forwarded-proto'] === 'https') } }));
app.use(cors());

// Middleware
app.use(require('../middleware/https'));
app.use(require('../middleware/environment'));

// Routes
app.use('/api', require('../middleware/auth'), require('../routes/api'));

// If no route is matched by now, it must be a 404
app.use(async (req, res) => {

  const env = req.app.get('environment');

  const info = {
    name: data.name,
    version: data.version,
    description: data.description,
  };

  info.services = await services.getAllServicesInfo(env);

  res.status(200).send(info);
});

module.exports = app;