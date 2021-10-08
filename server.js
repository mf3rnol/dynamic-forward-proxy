#!/usr/bin/env node

require('dotenv').config()

const http = require('http')
const https = require('https')
const colors = require('colors')
const getLogger = require('./lib/util/get_logger')
const createServer = require('./lib/server')
const logError = require('./lib/util/log_error')

const l = getLogger('prox-pool:server:http')
const server = createServer()

const {
  POOL_HTTP_SERVER_ENABLED: serverHTTPEnabled,
  POOL_HTTP_SERVER_HOST: serverHTTPHost,
  POOL_HTTP_SERVER_PORT: serverHTTPPort,
  POOL_HTTP_SERVER_BACKLOG: serverHTTPBacklog,
  POOL_HTTP_SERVER_EXCLUSIVE: serverHTTPExclusive,

  POOL_HTTPS_SERVER_ENABLED: serverHTTPSEnabled,
  POOL_HTTPS_SERVER_HOST: serverHTTPSHost,
  POOL_HTTPS_SERVER_PORT: serverHTTPSPort,
  POOL_HTTPS_SERVER_BACKLOG: serverHTTPSBacklog,
  POOL_HTTPS_SERVER_EXCLUSIVE: serverHTTPSExclusive
} = process.env

l.star('boot %s', colors.green(new Date().toLocaleString()))

const serverHTTP = http.createServer(app.callback())

serverHTTP.listen({
  port: serverHTTPPort,
  host: serverHTTPHost,
  backlog: serverHTTPBacklog,
  exclusive: serverHTTPExclusive === 'true'
})
const serverHTTPS = https.createServer(app.callback())

serverHTTPS.on('listening', () => {
  l.info(
    'open: %s:%s',
    colors.green(serverHTTPSHost),
    colors.blue(serverHTTPSPort)
  )
})
serverHTTPS.on('close', () => {
  l.info(
    'closed: %s:%s',
    colors.green(serverHTTPSHost),
    colors.blue(serverHTTPSPort)
  )
})

serverHTTPS.on('connection', (socket) => {
  l.debug('')

})

serverHTTPS.on('error', logError)

serverHTTPS.listen({
  port: serverHTTPSPort,
  host: serverHTTPSHost,
  backlog: serverHTTPSBacklog,
  exclusive: serverHTTPSExclusive === 'true'
})
