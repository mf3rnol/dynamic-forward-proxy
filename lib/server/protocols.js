const createEnum = require('../util/create_enum')

/**
 * Valid server types for the proxy pool endpoint.
 *
 * @name SERVER_PROTOCOLS
 * @type {Enum}
 * @property {string} HTTP - http server
 * @property {string} HTTPS - https server
 */
const SERVER_PROTOCOLS = createEnum(['HTTP', 'HTTPS'])

module.exports = SERVER_PROTOCOLS
