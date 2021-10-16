const colors = require('colors')
const _isError = require('lodash/isError')

const onRequestFailed = (l, data = {}) => {
  const { request = {}, error } = data
  const { url } = request
  const errMessage = _isError(error) ? error.message : error

  l.error('req error %s: %s', colors.cyan(url), colors.red(errMessage))
}

module.exports = onRequestFailed
