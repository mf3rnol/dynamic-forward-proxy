const os = require('os')
const colors = require('colors')

const ROOT_USERNAME = 'root'
const ROOT_UID = 0
const ROOT_GID = 0

// TODO: Extract into personal utility library
const throwIfUserIsRoot = () => {
  const userInfo = os.userInfo({ encoding: 'utf-8' })
  const { uid, gid, username } = userInfo

  if (uid === ROOT_UID || gid === ROOT_GID || username === ROOT_USERNAME) {
    throw new Error([
      colors.red('Execution as root user forbidden:'),
      colors.yellow(`[uid ${uid}, gid ${gid}, user ${username}]`)
    ].join(' '))
  }

  return userInfo
}

module.exports = throwIfUserIsRoot
