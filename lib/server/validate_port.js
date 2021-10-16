const _isFinite = require('lodash/isFinite')

// TOOD: Consider renaming to throwIfPortInvalid
const validatePort = (port) => {
  if (!_isFinite(port)) {
    throw new Error(`Server port must be finite: ${port}`)
  } else if (port <= 1024) {
    throw new Error('Server port must be less than 1024')
  }

  return port
}

module.exports = validatePort
