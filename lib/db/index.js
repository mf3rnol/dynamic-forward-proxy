const openDB = require('./open')

const {
  DB_JSON_STORE_PATH
} = process.env

const db = openDB(DB_JSON_STORE_PATH)
const dbReadPromise = db.read()

module.exports = dbReadPromise.then(Promise.resolve(db))
