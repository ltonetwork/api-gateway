'use strict';
const app = require('./lib/app');
const config = require('config');

app.listen(config.port, () => {
  console.log(`Started server on port: ${config.port}`);
});

module.exports = app;