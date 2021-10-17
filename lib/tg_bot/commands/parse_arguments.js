const _isNull = require('lodash/isNull')

const parseCommandArguments = (message, command = {}) => {
  const { regex, regexArgumentMapping } = command
  const argsRaw = regex.exec(message)
  const args = {}

  regexArgumentMapping.filter(a => !_isNull(a)).forEach((argName, i) => {
    args[argName] = argsRaw[i]
  })

  return args
}

module.exports = parseCommandArguments
