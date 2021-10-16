const _isEmpty = require('lodash/isEmpty')
const _isFinite = require('lodash/isFinite')
const { JsonDB: DB } = require('node-json-db')
const { Config: DBConfig } = require('node-json-db/dist/lib/JsonDBConfig')
const { logError } = require('./util')

const getDB = (args = {}) => {
  const {
    dbPath, syncOnChange, saveFormatted, sep, throwOnMissingData,
    saveIntervalMS, reloadIntervalMS
  } = args

  const dbConfig = new DBConfig(dbPath, syncOnChange, saveFormatted, sep)
  const db = new DB(dbConfig)

  db.load()

  db.get = throwOnMissingData
    ? db.getData
    : (...queryArgs) => {
      try {
        return db.getData(...queryArgs)
      } catch (err) {
        logError(err)

        return null
      }
    }

  if (_isFinite(saveIntervalMS) && saveIntervalMS > 0) {
    db.saveInterval = setInterval(db.save.bind(db), saveIntervalMS)
  }

  if (_isFinite(reloadIntervalMS) && reloadIntervalMS > 0) {
    db.reloadIntervalMS = setInterval(db.reload.bind(db), reloadIntervalMS)
  }

  db.close = () => {
    if (!_isEmpty(db.saveInterval)) {
      clearInterval(db.saveInterval)
    }

    if (!_isEmpty(db.reloadInterval)) {
      clearInterval(db.reloadInterval)
    }

    db.save()
  }

  return db
}

module.exports = getDB
