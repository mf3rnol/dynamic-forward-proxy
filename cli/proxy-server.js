#!/usr/bin/env node

const { promises: fs } = require('fs')
const path = require('path')
const Promise = require('bluebird')
const colors = require('colors')
const getServer = require('../lib/server')
const { execCLI } = require('../lib/util')

const cliProxyServerWorker = async (args = {}) => {
  const { config = {}, l, logError } = args
  const proxyListPathRel = path.relative(__dirname, proxyListPath)
  const proxyListJSON = await fs.readFile(proxyListPathRel, 'utf-8')
  const proxies = JSON.parse(proxyListJSON)

  l.debug('using %s proxies', colors.green(proxies.length))

  const server = getServer({ port, proxies })

  return new Promise((resolve) => {
    server.on('close', () => {
      resolve()
    })

    server.listen(() => {
      l.success('listening on port %s', colors.yellow(port))
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
