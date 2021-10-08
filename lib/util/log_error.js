const _isFunction = require('lodash/isFunction')
const _isObject = require('lodash/isObject')
const _isError = require('lodash/isError')
const getLogger = require('./get_logger')

const DEFAULT_LOGGER = getLogger()
const { ERROR_TRACES } = process.env

const logError = (err, l = DEFAULT_LOGGER) => {
  const errMessage = _isError(err)
    ? ERROR_TRACES === 'true'
      ? err.stack || err.messsage
      : err.message
    : `${err}`

  if (!_isObject(l) || !_isFunction(l.error)) {
    console.error(errMessage)
  } else {
    l.error('%s', errMessage)
  }

  return errMessage
}

module.exports = logError
