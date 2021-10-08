const colors = require('colors')
const geoip = require('geoip-lite-latest')
const getLogger = require('../util/get_logger')
const request = require('../request')

// TODO: Handle geoip DB updates

const l = getLogger()
const TEST_URL = 'https://ifconfig.me/all.json'
const {
  LATENCY_RATING_A_MS: latencyAMS,
  LATENCY_RATING_B_MS: latencyBMS,
  LATENCY_RATING_C_MS: latencyCMS,
  LATENCY_RATING_D_MS: latencyDMS,
  REQ_TIMEOUT_MS: reqTimeoutMS
} = process.env

const latencyAColor = colors.green
const latencyBColor = colors.yellow
const latencyCColor = colors.orange
const latencyDColor = colors.red
const latencyCutoffColor = colors.red.strikethrough

// TODO: Extract
const getLatencyColor = (latency) => {
  if (latency <= latencyAMS) {
    return latencyAColor
  } else if (latency <= latencyBMS) {
    return latencyBColor
  } else if (latency <= latencyCMS) {
    return latencyCColor
  } else if (latency <= latencyDMS) {
    return latencyDColor
  }

  return latencyCutoffColor
}

// TODO: Move into config and log in index.js
l.star('URL used for tests: %s', colors.green.bold(TEST_URL))

// TODO: Use array of test targets and average times?
const evaluateProxy = async (proxy = {}) => {
  const { host, url } = proxy
  const mtsStart = Date.now()

  const res = await request(TEST_URL, url, reqTimeoutMS)
  const { status, text } = res

  if (status !== 200) {
    throw new Error(`Status ${status}: ${text} [${url}]`)
  }

  const proxyInfo = JSON.parse(text)
  const mtsRTT = Date.now() - mtsStart
  const rttColorFunc = getLatencyColor(mtsRTT)
  const geo = geoip.lookup(host)
  const { country, region, city } = geo

  l.success(
    '%s: %s [%s, %s, %s]',
    colors.yellow(url),
    rttColorFunc(`${mtsRTT}ms`),
    colors.green(city || '-'),
    colors.green(region || ''),
    colors.green(country || '')
  )

  return {
    reportedIP: proxyInfo.ip_addr,
    hops: proxyInfo.forwarded.split(',').length - 1,
    mts: mtsStart,
    latency: mtsRTT,
    geo,
    ...proxy
  }
}

module.exports = evaluateProxy
