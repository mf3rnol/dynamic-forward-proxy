const Throttler = require('superagent-throttle')

const {
  MAX_CONCURRENCY,
  REQ_BATCH_SIZE,
  REQ_BATCH_INTERVAL_MS
} = process.env

const throttler = new Throttler({
  active: true,
  rate: REQ_BATCH_SIZE,
  ratePer: REQ_BATCH_INTERVAL_MS,
  concurreny: MAX_CONCURRENCY
})

module.exports = throttler
