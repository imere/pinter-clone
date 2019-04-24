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

app.use(express.static(require('path').resolve('dist')));

require('./middleware')(app);
require('./routes')(app);

app.get('*', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  require('fs').createReadStream(require('path').join(__dirname, '../dist/index.html')).pipe(res);
})

server.listen(PORT, HOST, () => {
  console.log(`Listening on ${server.address().address}:${PORT}`);
});
