const _trim = require('lodash/trim')
const _last = require('lodash/last')
const buildRegExp = require('./build_regexp')
const parseMatchList = require('./parse_match_list')

/**
 * Rule structure with both a regular expression, original specifications, and
 * a URL test function that returns a POJO with the parsed URL if it passes.
 *
 * @typedef Rule
 * @todo fill in
 */

/**
 * Returns a rule object with a regular expression and a function that breaks
 * down provided rule strings (ws://api.site.com/...) into their component
 * parts.
 *
 * Protocol is optional, and multiple subdomain levels are allowed. Used for
 * parsing user input, hence care required.
 *
 * @throws Error if any list entry is malformed/cannot be parsed
 *
 * @param {object} args - arguments
 * @param {string?} [args.defaultProtocol='http'] - protocol to prefix
 *   whitelist entries that lack their own.
 * @param {string[]} args.whitelist - array of URL glob patterns to allow
 * @param {string[]} args.blacklist - array of URL glob patterns to block
 * @returns {Rule} rule
 */
const generateRule = (args = {}) => {
  const {
    defaultProtocol = 'http',
    whitelist: rawWhitelist,
    blacklist: rawBlacklist
  } = args

  // TODO: Leaving as a stub for now; implement later today
  const whitelist = parseMatchList(rawWhitelist, defaultProtocol)
  const blacklist = parseMatchList(rawBlacklist, defaultProtocol)
  const testURL = () => true

  return {
    whitelist: rawWhitelist,
    blacklist: rawBlacklist,
    testURL
  }
}

module.exports = generateRule
