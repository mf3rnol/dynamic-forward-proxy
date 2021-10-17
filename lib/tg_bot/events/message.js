const _isObject = require('lodash/isObject')
const parseCommandArguments = require('../commands/parse_arguments')
const { logError } = require('../../util')

const onMessage = (bot, commands, data, metadata) => {
  const { chat, text } = data
  const command = commands.find(({ regex }) => regex.test(text))

  if (!_isObject(command)) {
    const { id: fromID } = chat

    return bot.sendMessage(fromID, `Unknown command: ${message}; try /help`)
  }

  const { handler } = command
  const args = parseCommandArguments(message, command)

  handler({ bot, args, data, commands, metadata }).catch(logError)
}

module.exports = onMessage
