const superagent = require('superagent')
const superagentProxy = require('superagent-proxy')
// const throttler = require('./throttler')

superagentProxy(superagent)

const request = (url, proxyURL, timeoutMS) => (
  superagent
    .get(url)
    .proxy(proxyURL)
    .timeout(timeoutMS)
)

module.exports = request
