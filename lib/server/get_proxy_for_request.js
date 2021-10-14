const _sample = require('lodash/sample')

const getProxyForRequest = (proxies = [], requestData = {}) => {
  const proxy = _sample(proxies)
  const { proxy: url } = proxy

  return url
}

module.exports = getProxyForRequest
