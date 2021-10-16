const _uniq = require('lodash/uniq')
const _last = require('lodash/last')

/**
 * @param list
 * @param defaultProtocol
 * @todo document
 * @todo Use RegExp later, covers all edge cases (poor user entry)
 * @todo add typedef for return type
 *
 * NOTE: Rules are broken up by protocol to allow for special handling of ws://
 * endpoints & co.
 */
const parseMatchList = (list = [], defaultProtocol = '') => {
  const rulesByProtocol = {}

  list.forEach((entry) => {
    const parts = entry.trim().split('://')

    if (parts.length > 2) {
      throw new Error(`Rule list entry is malformed: ${entry}`)
    }

    const protocol = (parts.length > 1 ? parts[0] : defaultProtocol).trim()
    const pattern = _last(parts).trim()

    rulesByProtocol[protocol] ||= []
    rulesByProtocol[protocol].push({ entry, pattern })
  })

  return rulesByProtocol
}

module.exports = parseMatchList
