const { promises: fs } = require('fs')
const path = require('path')
const Promise = require('bluebird')
const colors = require('colors')
const getServer = require('../../server')

/**
 * Temporary proxy server to be used until DB + evaluator service is up.
 * Starts with an empty proxy pool and continously polls from both a seed list
 * and the active pool to add/remove proxies based on their performance.
 *
 * @todo remove/extract into seperate project
 *
 * @param {object} args - args
 * @returns {Promise} p
 */
const serviceVolatileProxyServer = async (args = {}) => {
  const { config = {}, l } = args
  const { vServerProxySeedList, vServerPort, rootPath } = config
  const proxyListPathRel = path.relative(rootPath, vServerProxySeedList)
  const proxyListJSON = await fs.readFile(proxyListPathRel, 'utf-8')
  const proxies = JSON.parse(proxyListJSON)

  l.debug('seeded with %s proxies', colors.green(proxies.length))

  // const server = getServer({
  //   port: vServerPort,
  //   proxies
  // })

  // return new Promise((resolve) => {
  //   server.on('close', resolve)
  //   server.listen(() => {
  //     l.success('listening on port %s', colors.yellow(port))
  //   })
  // })
}

module.exports = serviceVolatileProxyServer
