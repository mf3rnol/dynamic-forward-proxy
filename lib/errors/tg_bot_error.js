/**
 * @todo create custom error class
 *
 * Every `Error` object we pass back has the properties:
 *
 * * `code` (String):
 *   * value is `EFATAL` if error was fatal e.g. network error
 *   * value is `EPARSE` if response body could **not** be parsed
 *   * value is `ETELEGRAM` if error was returned from Telegram servers
 * * `response` ([http.IncomingMessage](https://nodejs.org/api/http.html#http_class_http_incomingmessage)):
 *   * available if `error.code` is **not** `EFATAL`
 * * `response.body` (String|Object): Error response from Telegram
 *   * type is `String` if `error.code` is `EPARSE`
 *   * type is `Object` if `error.code` is `ETELEGRAM`
 *  *
 */

module.exports = Error
