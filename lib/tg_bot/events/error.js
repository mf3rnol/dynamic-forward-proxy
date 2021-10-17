const { logError } = require('../../cli')

const onError = (bot, error) => {
  logError(error)
}

module.exports = onError
