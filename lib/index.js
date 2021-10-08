// TODO: Use bluebird instead
const Promise = require('bluebird-global')
const path = require('path')
const colors = require('colors')
const PI = require('p-iteration')
const _chunk = require('lodash/chunk')
const _isEmpty = require('lodash/isEmpty')
const parseProxy = require('./proxy/parse')
const loadProxies = require('./proxy/load')
const evaluateProxy = require('./proxy/evaluate')
const getLogger = require('./util/get_logger')
const logError = require('./util/log_error.js')

const ROOT_PATH = path.join(__dirname, '../')
const l = getLogger()

const runProxyEvaluator = async (config = {}) => {
  const {
    defaultProxyProtocol,
    proxyListPath,
    reqBatchDelayMS,
    reqBatchSize,
    reqDelayMS
  } = config

  l.info('testing %s proxies at a time', colors.yellow(reqBatchSize))

  const relProxyListPath = path.relative(ROOT_PATH, proxyListPath)
  const proxyStrings = await loadProxies(relProxyListPath)
  const proxies = proxyStrings.map(proxyString => (
    parseProxy(proxyString, defaultProxyProtocol)
  ))

  await PI.forEachSeries(_chunk(proxies, reqBatchSize), async (proxyChunk) => {
    if (_isEmpty(proxyChunk)){
      return
    }

    PI.forEachSeries(proxyChunk, async (proxy) => {
      try {
        await evaluateProxy(proxy)
      } catch (err) {
        const { url } = proxy

        logError(new Error(`${url}: ${err.message}`))
      }

      await Promise.delay(reqDelayMS)
    })

    return Promise.delay(reqBatchDelayMS)
  })

  return proxies
}

module.exports = runProxyEvaluator
