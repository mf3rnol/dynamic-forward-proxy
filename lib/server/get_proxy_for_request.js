const colors = require('colors')
const _sample = require('lodash/sample')
const getLogger = require('../util/get_logger')

const l = getLogger('server:get-proxy-for-req')

const getProxyForRequest = (proxies = [], requestData = {}) => {
  const { request: req } = requestData
  const { url: reqURL } = req

  console.log(JSON.stringify(requestData, null, 2))

  const proxiesFilteredByLatency = proxies.filter(({ latencyMS }) => (
    latencyMS <= 2000
  ))

  l.info('%d proxies passed filter', proxiesFilteredByLatency.length)

  const proxy = _sample(proxiesFilteredByLatency)
  const { latencyMS, proxy: proxyURL } = proxy

  l.info(
    'proxying via %s: %s (latency est %s)',
    colors.green(proxyURL),
    colors.cyan(reqURL),
    colors.bgYellow.black(`${latencyMS}ms`)
  )

  return proxyURL
}

module.exports = getProxyForRequest
