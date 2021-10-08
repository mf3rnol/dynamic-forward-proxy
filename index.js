#! /usr/bin/env node

require('dotenv').config()

const colors = require('colors')
const runProxyEvaluator = require('./lib')
const getLogger = require('./lib/util/get_logger')
const logError = require('./lib/util/log_error')

const {
  PROXY_LIST_DEFAULT_PROTOCOL,
  PROXY_LIST_PATH,
  REQ_BATCH_DELAY_MS,
  REQ_BATCH_SIZE,
  REQ_DELAY_MS
} = process.env

const l = getLogger('main')
const dateStart = new Date()
const mtsStart = +dateStart

runProxyEvaluator({
  defaultProxyProtocol: PROXY_LIST_DEFAULT_PROTOCOL,
  proxyListPath: PROXY_LIST_PATH,
  reqBatchDelayMS: REQ_BATCH_DELAY_MS,
  reqBatchSize: REQ_BATCH_SIZE,
  reqDelayMS: REQ_DELAY_MS
}).then((proxies = []) => {
  return proxies.length
}).catch((err) => {
  logError(err, l)

  return 0
}).finally((proxyCount) => {
  l.star(
    'evaluated %s proxies in %sms',
    colors.yellow(proxyCount),
    colors.cyan.underline(Date.now() - mtsStart)
  )
})
