let LAST_ENUM_VALUE = 0

/**
 * Returns a unique number to be used as a value in an `Enum`.
 *
 * @todo replace with lodash method
 *
 * @returns {number} value
 */
const getUniqueEnumValue = () => {
  LAST_ENUM_VALUE += 1

  return LAST_ENUM_VALUE
}

module.exports = getUniqueEnumValue
