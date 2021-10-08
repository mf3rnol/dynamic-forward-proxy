const { EOL } = require('os')
const { promises: fs } = require('fs')
const colors = require('colors')
const _uniq = require('lodash/uniq')
const _isEmpty = require('lodash/isEmpty')
const getLogger = require('../util/get_logger')

// TODO: Truncate duplicates elsewhere
const loadProxies = async (listPath) => {
  const l = getLogger(null, { interactive: true })

  if (_isEmpty(listPath)) {
    throw new Error('Path to proxies not provided')
  }

  l.await('loading proxies from %s', colors.green(listPath))

  try {
    const proxyListStat = await fs.stat(listPath)

    if (!proxyListStat.isFile()) {
      throw new Error('proxy list not a file')
    }
  } catch (err) {
    throw new Error(`invalid proxy list (${err.message}) [${listPath}]`)
  }

  const listString = await fs.readFile(listPath, 'utf-8')
  const list = _uniq(listString.split(EOL).map(s => s.trim())).filter(s => !_isEmpty(s))

  l.debug(
    'loaded %s proxies from %s',
    colors.yellow(list.length),
    colors.blue(listPath)
  )

  return list
}

module.exports = loadProxies
