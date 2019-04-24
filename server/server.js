const http = require('http');
const express = require('express');
const {
  FALLBACK_UURI,
  FALLBACK_HOST,
  FALLBACK_PORT,
} = require('./config/config');

require('mongoose').connect(process.env.uuri || FALLBACK_UURI, {
  useNewUrlParser: true,
});

const app = express();
const server = http.createServer(app);

const HOST = process.env.HOST || FALLBACK_HOST;
const PORT = process.env.PORT || FALLBACK_PORT;

require('./middleware')(app);
require('./routes')(app);

server.listen(PORT, HOST, () => {
  console.log(`Listening on ${server.address().address}:${PORT}`);
});
