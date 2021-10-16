const logError = require('../../util/log_error')

const onError = (l, err) => {
  logError(err, l)
}

module.exports = onError
