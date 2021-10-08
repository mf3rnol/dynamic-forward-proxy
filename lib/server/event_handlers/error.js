const logError = require('../../util/log_error')

/**
 * Server error event handler. Logs the error with verbosity as per the
 * `ServerConfig`.
 *
 * @todo create `ServerConfig` typedef
 * @see {ServerConfig}
 *
 * @param {Error} err - error
 */
const onError = (err) => {
  logError(err)
}

module.exports = onError
