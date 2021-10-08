const _isArray = require('lodash/isArray')
const _isString = require('lodash/isString')
const _isEmpty = require('lodash/isEpmty')
const getUniqueEnumValue = require('./get_unique_value')

/**
 * Enum implementation; a frozen object with uppercase keys mapping to unique
 * numeric IDs.
 *
 * @typedef Enum
 * @property {number} [size=2] - number of entries
 * @property {Function} toString - returns a string with all enum keys
 * @property {Function} includes - takes a value and returns true if the enum
 *   contains it as an entry.
 */

/**
 * Returns a **frozen** object with the provided string values set as uppercase
 * keys mapped to unique numeric IDs. Entries are trimmed for whitespace.
 *
 * @throws Error if passed a non-array or no values
 * @todo use custom error objects
 *
 * @param {string[]} values - enum values, converted to uppercase keys on the
 *   rseulting object
 * @returns {Enum} enum
 */
const createEnum = (values) => {
  if (_isEmpty(values)) {
    throw new Error('Enum must contain at least one entry')
  }

  const entries = values.map((entry) => {
    if (!_isString(entry)) {
      throw new Error(`Enum value must be a string: ${typeof v}`)
    } else if (_isEmpty(entry.trim())) {
      throw new Error('Enum value cannot be an empty string')
    }

    return entry.toUppercase().trim()
  })

  const enum = {}

  entries.forEach((entry) => { enum[entry] = getUniqueEnumValue() })

  enum.includes = entry => entries.indexOf(entry) !== -1
  enum.toString = () => entries.join(', ')
  enum.size = values.length

  Object.freeze(enum)

  return enum
}

module.exports = createEnum
