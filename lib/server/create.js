const { Server: ProxyChainServer } = require('proxy-chain')
const { onError, onConnectionClosed, onRequestFailed } = require('./handlers')

/**
 * Returns a new ProxyChain server instance, connected to the proxy pool
 * system (TG bot control, etc)
 *
 * @see https://github.com/apify/proxy-chain
 *
 * @param {object} options - options
 * @returns {object} server
 *
 */
const createServer = (options = {}) => {
  const { l, ...serverArgs } = options
  const server = new ProxyChainServer(serverArgs)

  server.on('connectionClosed', onConnectionClosed.bind(null, l))
  server.on('requestFailed', onRequestFailed.bind(null, l))
  server.on('error', onError.bind(null, l))

  return server
}

module.exports = createServer
