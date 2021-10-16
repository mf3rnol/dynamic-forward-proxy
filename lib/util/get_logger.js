const signale = require('signale')

const { LOG_LEVEL } = process.env
const { Signale } = signale

const BASE_SCOPE = 'dynamic-forward-proxy'

signale.config({
  displayScope: true,
  displayBadge: true,
  displayDate: false,
  displayFilename: false,
  displayLabel: true,
  displayTimestamp: true,
  underlineLabel: true,
  underlineMessage: false,
  underlinePrefix: true,
  underlineSuffix: true,
  uppercaseLabel: false,
  logLevel: LOG_LEVEL,
  scope: BASE_SCOPE
})

signale.config({
  displayScope: true,
  displayBadge: true,
  displayDate: false,
  displayFilename: false,
  displayLabel: true,
  displayTimestamp: true,
  underlineLabel: true,
  underlineMessage: false,
  underlinePrefix: true,
  underlineSuffix: true,
  uppercaseLabel: false,
  logLevel: LOG_LEVEL,
  scope: BASE_SCOPE
})

const getLogger = (scope = '') => new Signale({ scope })

module.exports = getLogger
