'use strict';
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const log = require('./logger');
const mustacheExpress = require('mustache-express');

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

// app.engine('html', mustacheExpress());
// app.set('view engine', 'html');
// app.set('view cache', false);
// app.set('views', settings.views || settings.path);
// if (settings.serveStatic) {
//   app.use(express.static(settings.path));
// }
app.use(express.static('public'));

// Middleware
app.use(require('../middleware/https'));
app.use(require('../middleware/environment'));

// Routes
app.use('/api', require('../routes/api'));

// If no route is matched by now, it must be a 404
app.use((req, res) => {
  res.status(404).send('Not found!');
});

module.exports = app;