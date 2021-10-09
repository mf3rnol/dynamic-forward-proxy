#!/usr/bin/env node

require('dotenv').config()

const colors = require('colors')
const getBot = require('./lib/tg_bot')
const getLogger = require('./lib/util/get_logger')
const logError = require('./lib/util/log_error')

const { TELEGRAM_BOT_TOKEN } = process.env

const l = getLogger('tg-bot')

const run = async () => {
  const bot = getBot(TELEGRAM_BOT_TOKEN)

  l.star('started: %s', colors.green(new Date().toLocaleString()))

  const botUser = await bot.getMe()
  const { id, username } = botUser

  l.info('username %s [%s]', colors.green(username), colors.yellow(id))
}

run().then(() => {
  l.star('stopped: %s', colors.green(new Date().toLocaleString()))

  return null
}).catch(logError)
