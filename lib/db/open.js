const { Low, JSONFile } = require('lowdb')
const _isEmpty = require('lodash/isEmpty')

const openDB = (dbPath) => {
  if (_isEmpty(dbPath)) {
    throw new Error('DB path required')
  }

  const dbAdapter = new JSONFile(dbPath)

  return new Low(dbAdapter)
}

module.exports = openDB
