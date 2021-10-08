const _isFinite = require('lodash/isFinite')
const _includes = require('lodash/includes')
const _isEmpty = require('lodash/isEmpty')
const _isString = require('lodash/isString')

/**
 * @todo add typedef for returned proxy [info] object
 * @param {string} proxyString - may include protocol as prefix
 * @param {string?} protocol - http, https, socks4, socks5
 * @returns {object}
 */
const parse = (proxyString, defaultProtocol) => {
  if (_isEmpty(defaultProtocol) || !_isString(defaultProtocol)) {
    throw new Error(`Default protocol invalid: ${defaultProtocol}`)
  }

  let host = ''
  let port = 80
  let protocol = defaultProtocol
  let srcString = proxyString

  // Protocol may be as prefix
  if (_includes(proxyString, '://')) {
    const [
      parsedProtocol,
      remainder
    ] = proxyString.split('://')

    // TODO: Enforce against enums

    protocol = parsedProtocol
    srcString = remainder
  }

  if (_includes(srcString, ':')) {
    const [ parsedHost, parsedPort ] = srcString.split(':')

    host = parsedHost
    port = parsedPort
  } else {
    host = srcString
  }

  let url = `${protocol}://${host}`

  if (_isFinite(+port)) {
    url += `:${port}`
  }

  return { protocol, host, port, url }
}

module.exports = parse
