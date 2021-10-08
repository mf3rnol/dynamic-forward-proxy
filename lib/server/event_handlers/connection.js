const colors = require('colors')

/**
 * Handler called for each new client connection.
 *
 * @param {Signale} l - logger instance
 * @param {net.Socket} socket - client socket
 */
const onConnection = (l, socket) => {
  const { ip } = socket

  l.info('connection from %s', colors.green(ip))
}

module.exports = onConnection
