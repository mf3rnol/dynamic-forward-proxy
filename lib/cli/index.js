const exec = require('./exec')
const services = require('./services')

module.exports = {
  ...services,
  exec
}
