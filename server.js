#!/usr/bin/env node

require('dotenv').config()

const { promises: fs } = require('fs')
const path = require('path')
const Promise = require('bluebird')
const colors = require('colors')
const createServer = require('./lib/server')
const getLogger = require('./lib/util/get_logger')
const logError = require('./lib/util/log_error')

const l = getLogger('exec:server')
const {
  SERVER_PORT: port,
  SERVER_PROXY_LIST_PATH: proxyListPath
} = process.env

const run = async () => {
  const proxyListPathRel = path.relative(__dirname, proxyListPath)
  const proxyListJSON = await fs.readFile(proxyListPathRel, 'utf-8')
  const proxies = JSON.parse(proxyListJSON)

  l.success('using %s proxies', colors.green(proxies.length))

  const server = createServer({ port: +port, proxies })

  server.listen(() => {
    l.success('listening on port %s', colors.yellow(port))
  })

  return new Promise((resolve) => {
    server.on('close', () => {
      resolve()
    })
  })
}

const mtsStart = Date.now()

l.star('started: %s', colors.cyan(new Date(mtsStart).toLocaleString()))

run().then(() => {
  const mtsEnd = Date.now()

  l.star(
    'finished after %s: %s',
    colors.green(`${mtsEnd - mtsStart}ms`),
    colors.cyan(new Date(mtsEnd).toLocaleString())
  )

  return null
}).catch((err) => {
  logError(err, l)

  return null
})
