const colors = require('colors')

/**
 * Handler called when all server responses are completed and the socket is
 * closed.
 *
 * @param {Signale} l - logger instance
 * @param {ServerConfig} config - server config
 */
const onClose = (l, config) => {
  const { host, port } = config

  l.info(
    'closed: %s:%s',
    colors.green(host),
    colors.blue(port)
  )
}

module.exports = onClose
