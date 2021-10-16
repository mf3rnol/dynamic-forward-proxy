const getLogger = require('../util/get_logger')
const getPrepareRequestFunc = require('./get_prepare_request_func')
const validatePort = require('./validate_port')
const createServer = require('./create')

const getServer = (options = {}) => {
  const { proxies, port: serverPort, ...extraServerOptions } = options

  const port = validatePort(+port)
  const l = getLogger(`server:${port}`)

  const prepareRequestFunction = getPrepareRequestFunc(proxies)
  const serverArgs = {
    ...extraServerOptions,
    prepareRequestFunction,
    port
  }

  return createServer(serverArgs)
}

module.exports = getServer
