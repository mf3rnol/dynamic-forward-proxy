const colors = require('colors')

const onConnectionClosed = (l, data = {}) => {
  const { connectionId } = data

  l.debug(colors.gray('connection closed: %s'), connectionId)
}


module.exports = onConnectionClosed
