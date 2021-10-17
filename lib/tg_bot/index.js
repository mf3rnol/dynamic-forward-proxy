const _noop = require('lodash/noop')
const createBot = require('./create')
const onError = require('./events/error')
const onCBQuery = require('./events/cb_query')
const onMessage = require('./events/message')
const onChannelPost = require('./events/channel_post')
const onInlineQuery = require('./events/inline_query')
const onWebhookError = require('./events/webhook_error')
const onEditedMessage = require('./events/edited_message')
const onChosenInlineResult = require('./events/chosen_inline_result')
const onEditedChannelPost = require('./events/edited_channel_post')
const getCommands = require('./commands')

const getBot = (token) => {
  const bot = createBot(token)
  const comands = getCommands(bot)

  bot.on('message', onMessage.bind(null, bot))
  bot.on('callback_query', onCBQuery.bind(null, bot))
  bot.on('inline_query', onInlineQuery.bind(null, bot))
  bot.on('chosen_inline_result', onChosenInlineResult.bind(null, bot))
  bot.on('channel_post', onChannelPost.bind(null, bot))
  bot.on('edited_messsage', onEditedMessage.bind(null, bot))
  bot.on('edited_channel_post', onEditedChannelPost.bind(null, bot))
  bot.on('webhook_error', onWebhookError.bind(null, bot))
  bot.on('error', onError.bind(null, bot))

  // Stubs to handle all events
  bot.on('pre_checkout_query', _noop)
  bot.on('shipping_query', _noop)
  bot.on('polling_error', _noop)
  bot.on('poll', _noop)

  bot.setMyCommands(comands)

  return bot
}

module.exports = getBot
