const colors = require('colors')
const _isError = require('lodash/isError')
const _isFinite = require('lodash/isFinite')
const { Server: ProxyChainServer } = require('proxy-chain')
const getLogger = require('../util/get_logger')
const logError = require('../util/log_error')
const getPrepareRequestFunc = require('./get_prepare_request_func')

const createServer = (options = {}) => {
  const l = getLogger('server')
  const { proxies, port, ...extraServerOptions } = options

  if (!_isFinite(port)) {
    throw new Error(`Server port must be finite: ${port}`)
  } else if (port <= 1024) {
    throw new Error('Server port must be less than 1024')
  }

  const prepareRequestFunction = getPrepareRequestFunc(proxies)
  const server = new ProxyChainServer({
    port,
    ...extraServerOptions,
    prepareRequestFunction
  })

  server.on('connectionClosed', (data = {}) => {
    const { connectionId } = data

    l.info('connection closed: %s', colors.cyan(connectionId))
  })

  server.on('requestFailed', (data = {}) => {
    const { request = {}, error } = data
    const { url } = request
    const errMessage = _isError(error) ? error.message : error

    l.error('req error %s: %s', colors.cyan(url), colors.lightRed(errMessage))
  })

  server.on('error', (err) => {
    logError(err, l)
  })

  return server
}

module.exports = createServer
