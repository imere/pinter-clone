require('dotenv').config()
const http = require('http')
const express = require('express')
const history = require('connect-history-api-fallback')
const fs = require('fs')
const path = require('path')

require('mongoose').connect(process.env.uuri || 'mongodb://127.0.0.1:27017/test', {
  useNewUrlParser: true
})

const app = express()
const server = http.createServer(app)

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 80

app.use(express.static('dist'))

app.use(require('compression')())

require('./middleware')(app)
require('./routes')(app)

app.use(history({
  rewrites: [{
    from: /.*/,
    to: '/index.html'
  }],
  disableDotRule: true
}))

app.get('*', (req, res) => {
  res.header({
    'Content-Type': 'text/html'
  })
  res.send(fs.readFileSync(path.join('dist', 'index.html')))
})

server.listen(PORT, HOST, () => {
  console.log(`Listening on ${server.address().address}:${PORT}`)
})
