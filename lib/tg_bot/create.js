const TelegramBot = require('node-telegram-bot-api')

const TELEGRAM_API_ENDPOINT = 'https://api.telegram.org'

/**
 * Returns a TG bot instance.
 *
 * @todo improve description
 * @todo Switch to web-hook connection immediately
 *
 * @param {string} token - TG bot API token
 * @returns {TelegramBot} bot
 */
const createBot = token => (
  new TelegramBot(token, {
    webHook: false,
    onlyFirstMatch: false,
    baseApiUrl: TELEGRAM_API_ENDPOINT,
    filepath: false,
    badRejection: false,
    polling: {
      interval: 100, // ms
      autoStart: true,
      params: {
        timeout: 2 // s, long polling
      }
    }
  })
)

module.exports = createBot
