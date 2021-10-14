const path = require('path')
const Bluebird = require('bluebird')
const colors = require('colors')
const PI = require('p-iteration')
const _chunk = require('lodash/chunk')
const _isEmpty = require('lodash/isEmpty')
const parseProxy = require('./proxy/parse')
const loadProxies = require('./proxy/load')
const evaluateProxy = require('./proxy/evaluate')
const getLogger = require('./util/get_logger')
const getDB = require('./db')

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

  const db = await getDB()
  const relProxyListPath = path.relative(ROOT_PATH, proxyListPath)
  const proxyStrings = await loadProxies(relProxyListPath)
  const proxies = proxyStrings.map(proxyString => (
    parseProxy(proxyString, defaultProxyProtocol)
  ))

  await PI.forEachSeries(_chunk(proxies, reqBatchSize), async (proxyChunk) => {
    if (_isEmpty(proxyChunk)) {
      return
    }

    PI.forEachSeries(proxyChunk, async (proxy) => {
      const result = await evaluateProxy(proxy)
      const { id } = proxy

      db.benchmarks ||= {}
      db.benchmarks[id] ||= []
      db.benchmarks[id].push(result)

      await db.write()
      await Bluebird.delay(reqDelayMS)
    })

    return Bluebird.delay(reqBatchDelayMS)
  })

  return proxies
}

module.exports = runProxyEvaluator
