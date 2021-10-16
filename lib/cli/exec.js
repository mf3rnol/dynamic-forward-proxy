const colors = require('colors')
const _isEmpty = require('lodash/isEmpty')
const _isString = require('lodash/isString')
const {
  getConfig, getLogger, logError
} = require('../util')

const exec = async (workerName, worker) => {
  if (!_isString(workerName) || _isEmpty(workerName)) {
    throw new Error(`Worker name required: ${workerName}`)
  }

  const config = getConfig()
  const l = getLogger(`cli:${workerName}`)
  const dateStart = new Date()

  l.star('start: %s', colors.cyan(dateStart.toLocaleString()))

  const workerResult = await worker({ config, l, logError })
  const dateEnd = new Date()
  const mtsDuration = dateEnd - dateStart

  l.star('end: %s', colors.cyan(dateEnd.toLocaleString()))
  l.star('ran for %s', colors.yellow(`${mtsDuration}ms`))

  return workerResult
}

module.exports = exec
