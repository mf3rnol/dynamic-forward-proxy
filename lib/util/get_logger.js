const signale = require('signale')
const { name: packageName } = require('../../package.json')

const { LOG_LEVEL } = process.env

signale.config({
  displayScope: false,
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

// TODO: Refactor; scope currently ignored for aligned output
const getLogger = () => signale

module.exports = getLogger
