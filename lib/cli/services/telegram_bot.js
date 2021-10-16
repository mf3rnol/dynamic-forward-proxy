const colors = require('colors')
const getBot = require('../../tg_bot')

const serviceTelegramBot = async (args = {}) => {
  const { config, l } = args
  const { telegramBotToken } = config
  const bot = getBot(telegramBotToken)

  const botUser = await bot.getMe()
  const { id, username } = botUser

  l.info('username %s [%s]', colors.green(username), colors.yellow(id))
}

module.exports = serviceTelegramBot
