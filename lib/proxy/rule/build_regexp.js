const _isArray = require('lodash/isArray')
const _isEmpty = require('lodash/isEmpty')
const _reverse = require('lodash/reverse')
const _flattenDeep = require('lodash/flattenDeep')

/**
 * Returns a regular expression that matches a site served via multiple
 * mirrors.
 *
 * @todo rename/refactor
 *
 * @param {string[]} aliases - array of domain base URLs, w/o protocol
 * @param {(string|string[])} protocols - one or more of http, https, ws, etc
 * @returns {RegExp} regexp
 */
const buildRegExp = (aliases = [], protocol) => {

  // NOTE: _reverse to handle subdomains with same logic (api.site.com)
  const data = aliases.map(alias => _reverse(alias.split('.')))

  const domainParts = data.map(([, ...domain]) => domain.join('.')).join('|')
  const tlds = data.map(([tld]) => tld).join('|')
  const protocols = _flattenDeep([protocol])

  const reString = [
    _isEmpty(protocols) ? '/^' : `/^\\(${protocols}\\)`,
    `\\(${domainParts.replace(/\./u, '\\.')}\\)\\.`,
    `\\(${tlds}\\)`,
    '\\(.*\\)$/'
  ].join('')

  return new RegExp(reString, 'u')
}

module.exports = buildRegExp
