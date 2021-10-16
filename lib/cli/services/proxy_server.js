const { promises: fs } = require('fs')
const path = require('path')
const Promise = require('bluebird')
const colors = require('colors')
const getServer = require('../../server')

const serviceProxyServer = async (args = {}) => {
  const { config = {}, l, logError } = args
  const { serverProxyListPath, serverPort: port, rootPath } = config
  const proxyListPathRel = path.relative(rootPath, serverProxyListPath)
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

module.exports = serviceProxyServer
