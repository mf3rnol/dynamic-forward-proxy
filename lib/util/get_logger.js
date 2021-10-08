const signale = require('signale')
const { name: packageName } = require('../../package.json')

const { LOG_LEVEL } = process.env
const { Signale } = signale

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
  scope: packageName
})

const getLogger = (scope = '') => new Signale({ scope })

module.exports = getLogger
