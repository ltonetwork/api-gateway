'use strict';
const app = require('./lib/app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Started server on port: ${port}`);
});

module.exports = app;