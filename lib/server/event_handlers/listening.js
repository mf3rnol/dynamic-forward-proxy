const colors = require('colors')

/**
 * Handler called when the server is open on the specified host/port
 * and ready to receive connections. Any backlog'ed requests are handled
 * prior to this event being fired.
 *
 * @todo create Signale typedef
 *
 * @param {Signale} l - loggger instance
 * @param {ServerConfig} config - server config
 */
const onListening = (l, config) => {
  const { host, port } = config

  l.info(
    'open: %s:%s',
    colors.green(host),
    colors.blue(port)
  )
}

module.exports = onListening
