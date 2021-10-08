const http = require('http')
const https = require('https')
const _isFinite = require('lodash/isFinite')
const _isString = require('lodash/isString')
const _isEmpty = require('lodash/isEmpty')
const getLogger = require('../util/get_logger')
const onListening = require('./event_handlers/listening')
const onConnection = require('./event_handlers/connection')
const onClose = require('./event_handlers/close')
const onError = require('./event_handlers/error')

const l = getLogger('server')

/**
 * Configuration for an HTTP or HTTPS server to serve the proxy pool endpoint.
 *
 * @typedef ServerConfig
 * @property {ServerProtocol} protocol - server protocol
 * @property {string?} host - server hostname
 * @property {number} port - server port
 * @property {number?} [backlog=1024] - number of requests the server
 *   will store in a backlog prior to opening
 * @property {boolean?} [exclusive=true] - server port bind exclusivity
 */

/**
 * Creates a new HTTP or HTTPS server instance, binding common listeners to
 * server events.
 *
 * @param {Function} listenCB - passed to createServer()
 * @param {ServerConfig} config - config
 * @returns {net.HTTP|net.HTTPS} server
 */
const createServer = (listenCB, config = {}) => {
  const {
    type, host, port, backlog = 1024, exclusive = true
  } = config

  if (!SERVER_PROTOCOLS.includes(type)) {
    throw new Error(`Invalid server type ${type}; config are ${SERVER_PROTOCOLS}`)
  }

  const serverClass = type === SERVER_PROTOCOLS.HTTP ? http : https
  const server = serverClass.createServer(listenCB)

  server.on('listening', onListening.bind(null, l, config))
  server.on('close', onClose.bind(null, l, config))
  server.on('connection', onConnection.bind(null, l))
  server.on('error', onError)

  server.open = () => {
    server.listen(config)
  }

  return server
}

module.exports = createServer
