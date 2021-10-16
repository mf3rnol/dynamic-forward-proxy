const onConnectionClosed = require('./on_connection_closed')
const onRequestFailed = require('./on_request_failed')
const onError = require('./on_error')

module.exports = {
  onConnectionClosed,
  onRequestFailed,
  onError
}
