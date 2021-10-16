const _last = require('lodash/last')

/**
 * Parses a list of domain proxy rules (glob patterns) and returns an array of
 * Rule objects grouped by protocol. This eases logic for handling websocket
 * connections (API) vs static file delivery.
 *
 * @todo Use RegExp later, covers all edge cases (poor user entry)
 * @todo add typedef for return type
 * @todo rename to parseRuleList
 *
 * @param {string[]} list - array of glob patterns to match against incoming
 *   requests.
 * @param {string?} [defaultProtocol='http'] - to be used if a rule in the list omits the
 *   protocol in the glob pattern.
 * @returns {object} rulesByProtocol
 */
const parseMatchList = (list = [], defaultProtocol = 'http') => {
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
