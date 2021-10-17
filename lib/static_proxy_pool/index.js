const PI = require('p-iteration')
const _sample = require('lodash/sample')
const objectHash = require('object-hash')
const createEnum = require('../util/enum/create')
const evaluateProxy = require('../proxy/evaluate')
const { getLogger } = require('../util')

const SAMPLE_MODES = createEnum('ROUND_ROBIN', 'RANDOM', 'LOAD', 'LATENCY')
const l = getLogger('static-proxy-pool')

/**
 * Maintains a list of proxies and their statistics. Evaluates all proxies on
 * an interval, removing those that fail to meet minimum performance
 * thresholds, and re-adding those that meet them.
 *
 * The pool is static, and always limited to the list of proxies it is seeded
 * with.
 *
 * @todo refactor to traditional style
 * @todo renmae fitness test funcs
 */
class StaticProxyPool {
  static poolFromProxies (proxies = []) {
    const pool = {}

    proxies.forEach((proxy) => {
      const id = objectHash(proxy)

      /**
       * @todo add typedef & make first-class data structure
       */
      pool[id] = {
        stats: null,
        requestCount: 0,
        proxy
      }
    })

    return pool
  }

  constructor (args = {}) {
    const { proxies = [], fitnessTestIntervalMS } = args

    this.proxyPool = StaticProxyPool.poolFromProxies(proxies)
    this.fitnessTestIntervalMS = fitnessTestIntervalMS
    this.fitnessTestInterval = null

    this.fitnessTestIntervalCB = this.fitnessTestIntervalCB.bind(this)
  }

  enableFitnessTest () {
    if (this.fitnessTestInterval !== null) {
      throw new Error('Fitness test interval already running')
    }

    this.fitnessTestInterval = setInterval(
      this.fitnessTestIntervalCB,
      this.fitnessTestIntervalMS
    )
  }

  disableFitnessTest () {
    if (this.fitnessTestInterval === null) {
      throw new Error('Fitness test interval not running')
    }

    clearInterval(this.fitnessTestInterval)

    this.fitnessTestInterval = null
  }

  fitnessTestIntervalCB () {
    this.testPoolFitness().catch((err) => {
      logError(err, this.l)
    })
  }

  /**
   * @todo chunk proxies for tests (do not abuse test endpoint)
   */
  async testPoolFitness () {
    return PI.forEach(this.proxyPool, this.testProxyFitness)
  }

  /**
   * @todo rename as this function also modifies the poolj
   */
  async testProxyFitness (poolEntry = {}) {
    const { proxy } = poolEntry
    const result = await evaluateProxy(proxy)

    l.star('%s', JSON.stringify(result, null, 2))
  }

  sampleProxy (options = {}) {
    const { mode } = options

    switch (mode) {
      case SAMPLE_MODES.ROUND_ROBIN: {
        return this.sampleProxyViaRoundRobin()
      }

      case SAMPLE_MODES.RANDOM: {
        return this.sampleProxyViaRandom()
      }

      case SAMPLE_MODES.LOAD: {
        return this.sampleProxyViaLoad()
      }

      case SAMPLE_MODES.LATENCY: {
        return this.sampleProxyViaLatency()
      }

      default: {
        throw new Error(`Unknown sample mode: ${mode}`)
      }
    }
  }

  /**
   * @todo implement (for Dennis modus)
   */
  sampleProxyViaLatency () {
    return this.sampleProxyViaRandom()
  }

  /**
   * @todo implement (for Dennis modus)
   */
  sampleProxyViaLoad () {
    return this.sampleProxyViaRandom()
  }

  /**
   * @todo implement (for Dennis modus)
   */
  sampleProxyViaRandom () {
    const poolEntry = _sample(this.proxyPool)
    const { proxy } = poolEntry

    return proxy
  }

  /**
   * @todo implement (for Dennis modus)
   */
  sampleProxyViaRoundRobin () {
    return this.sampleProxyViaRandom()
  }
}

module.exports = StaticProxyPool
