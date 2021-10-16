const throwIfUserIsRoot = require('./throw_if_user_is_root')
const getConfig = require('./get_config')
const getLogger = require('./get_logger')
const logError = require('./log_error')

module.exports = {
  throwIfUserIsRoot,
  getConfig,
  getLogger,
  logError
}
