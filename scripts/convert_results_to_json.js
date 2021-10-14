const { promises: fs } = require('fs')
const { EOL } = require('os')
const path = require('path')
const colors = require('colors')
const _isEmpty = require('lodash/isEmpty')
const _last = require('lodash/last')
const replaceExt = require('replace-ext')

const getLogger = require('../lib/util/get_logger')
const logError = require('../lib/util/log_error')

const l = getLogger('scripts:convert-results-to-json')
const rootPath = path.join(__dirname, '../')
const inputFN = _last(process.argv)
const inputPath = path.relative(rootPath, inputFN)

const RAW_RESULT_REGEXP = /^(.*):\s(.*)\s\[(.*),(.*),(.*)\]/u

const convertResultsToJSON = async (resultsRawPath) => {
  const resultsJSONPath = replaceExt(resultsRawPath, '.json')
  const resultsRaw = await fs.readFile(resultsRawPath, 'utf-8')
  const results = resultsRaw.split(EOL)

  l.success(
    'read %s results',
    colors.green(results.length),
    colors.blue(resultsRawPath)
  )

  const resultsData = results
    .map(res => RAW_RESULT_REGEXP.exec(res))
    .filter(res => !_isEmpty(res))
    .map(([, proxy, latency, city, region, country]) => ({
      proxy: proxy.trim(),
      latencyMS: Number(latency.trim().replace(/ms/u, '')),
      city: city.trim(),
      region: region.trim(),
      country: country.trim()
    }))
    .map(({ city, region, country, ...data }) => ({
      city: city === '-' ? null : city,
      region: region === '-' ? null : region,
      country: country === '-' ? null : country,
      ...data
    }))

  resultsData.sort(({ latencyMS: latencyMSA }, { latencyMS: latencyMSB }) => (
    latencyMSA - latencyMSB
  ))

  await fs.writeFile(resultsJSONPath, JSON.stringify(resultsData))

  l.success(
    'wrote %s results: %s',
    colors.green(resultsData.length),
    colors.blue(resultsJSONPath)
  )

  return resultsData
}

const mtsStart = Date.now()

convertResultsToJSON(inputPath).then(() => {
  const mtsDuration = Date.now() - mtsStart

  l.success('finished in %sms', colors.blue(mtsDuration))
}).catch((err) => {
  logError(err, l)
})
