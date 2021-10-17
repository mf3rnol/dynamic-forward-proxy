const evaluateProxy = require('../../../proxy/evaluate')
const parseProxy = require('../../../proxy/parse')

const checkCommandHandler = async (bot, fromID, proxyURL) => {
  const proxy = parseProxy(proxyURL)
  const result = await evaluateProxy(proxy)

  bot.sendMessage(fromID, JSON.stringify(result, null, 2))
}

module.exports = checkCommandHandler
