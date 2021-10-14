const getProxyForRequest = require('./get_proxy_for_request')

const getPrepareRequestFunc = (proxies = []) => (data = {}) => ({
  upstreamProxyUrl: getProxyForRequest(proxies, data)
})

module.exports = getPrepareRequestFunc
