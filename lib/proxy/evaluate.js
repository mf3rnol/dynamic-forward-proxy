const colors = require('colors')
const geoip = require('geoip-lite-latest')
const getLogger = require('../util/get_logger')
const request = require('../request')
const colorByLatency = require('./color_by_latency')
// const getDB = require('../db')

const l = getLogger('proxy:evaluate')
const TEST_URL = 'https://ifconfig.me/all.json'
const { REQ_TIMEOUT_MS: reqTimeoutMS } = process.env

const evaluateProxy = async (proxy = {}) => {
  const { host, url } = proxy
  const mtsStart = Date.now()

  const res = await request(TEST_URL, url, reqTimeoutMS)
  const { status, text } = res

  if (status !== 200) {
    return {
      up: false,
      ...proxy
    }
  }

  const proxyInfo = JSON.parse(text)
  const mtsRTT = Date.now() - mtsStart
  const geo = geoip.lookup(host) || {}
  const { country, region, city } = geo

  l.success(
    '%s: %s [%s, %s, %s]',
    colors.yellow(url),
    colorByLatency(mtsRTT, `${mtsRTT}ms`),
    colors.green(city || '-'),
    colors.green(region || ''),
    colors.green(country || '')
  )

  return {
    up: true,
    reportedIP: proxyInfo.ip_addr,
    hops: proxyInfo.forwarded.split(',').length - 1,
    mts: mtsStart,
    latency: mtsRTT,
    geo,
    proxy
  }
}

module.exports = evaluateProxy
