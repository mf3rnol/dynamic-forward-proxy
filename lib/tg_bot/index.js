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

const getBot = (token) => {
  const bot = createBot(token)

  bot.on('message', onMessage)
  bot.on('callback_query', onCBQuery)
  bot.on('inline_query', onInlineQuery)
  bot.on('chosen_inline_result', onChosenInlineResult)
  bot.on('channel_post', onChannelPost)
  bot.on('edited_messsage', onEditedMessage)
  bot.on('edited_channel_post', onEditedChannelPost)
  bot.on('webhook_error', onWebhookError)
  bot.on('error', onError)

  // Stubs to handle all events
  bot.on('pre_checkout_query', _noop)
  bot.on('shipping_query', _noop)
  bot.on('polling_error', _noop)
  bot.on('poll', _noop)

  return bot
}

module.exports = getBot
