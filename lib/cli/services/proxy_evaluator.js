const path = require('path')
const Bluebird = require('bluebird')
const colors = require('colors')
const PI = require('p-iteration')
const _chunk = require('lodash/chunk')
const _isEmpty = require('lodash/isEmpty')
const parseProxy = require('../../proxy/parse')
const loadProxies = require('../../proxy/load')
const evaluateProxy = require('../../proxy/evaluate')
const getDB = require('../../db')

const serviceProxyEvaluator = async (args = {}) => {
  const { config, l } = args
  const {
    defaultProxyProtocol, proxyListPath, reqBatchDelayMS, reqBatchSize,
    reqDelayMS, rootPath
  } = config

  l.info('testing %s proxies at a time', colors.yellow(reqBatchSize))

  const db = await getDB()
  const relProxyListPath = path.relative(rootPath, proxyListPath)
  const proxyStrings = await loadProxies(relProxyListPath)
  const proxies = proxyStrings.map(proxyString => (
    parseProxy(proxyString, defaultProxyProtocol)
  ))

  const proxyGroups = _chunk(proxies, reqBatchSize).filter(c => !_isEmpty(c))

  await PI.forEachSeries(proxyGroups, async (proxyChunk) => {
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

module.exports = serviceProxyEvaluator
