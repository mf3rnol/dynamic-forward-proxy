const _isFinite = require('lodash/isFinite')
const _includes = require('lodash/includes')
const _isEmpty = require('lodash/isEmpty')
const _isString = require('lodash/isString')
const objectHash = require('object-hash')

/**
 * Parses a proxy string (i.e. http://127.0.0.1:8080 into an object.
 *
 * @todo add typedef for returned proxy [info] object
 *
 * @param {string} proxyString - may include protocol as prefix
 * @param {string} protocol - http, https, socks4, socks5
 * @returns {object} proxy
 */
const parse = (proxyString, protocol) => {
  if (_isEmpty(protocol) || !_isString(defaultProtocol)) {
    throw new Error(`Default protocol invalid: ${protocol}`)
  }

  let host = ''
  let port = 80
  let resolvedProtocol = protocol
  let srcString = proxyString

  // Protocol may be as prefix
  if (_includes(proxyString, '://')) {
    const [parsedProtocol, remainder] = proxyString.split('://')

    // TODO: Enforce against enums

    resolvedProtocol = parsedProtocol
    srcString = remainder
  }

  if (_includes(srcString, ':')) {
    const [parsedHost, parsedPort] = srcString.split(':')

    host = parsedHost
    port = parsedPort
  } else {
    host = srcString
  }

  let url = `${resolvedProtocol}://${host}`

  if (_isFinite(+port)) {
    url += `:${port}`
  }

  const proxy = { protocol: resolvedProtocol, host, port, url }
  const id = objectHash(proxy)

  return { ...proxy, id }
}

module.exports = parse
