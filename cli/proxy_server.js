#!/usr/bin/env node

const { exec, serviceProxyServer } = require('../lib/cli')

/**
 * Prior to control via TG bot, operation will be defined here for Dennis to
 * get up and running quickly.
 *
 * @todo refactor, swap lowdb out for a proper DB + inter-service messsaging
 */

const MIRRORS = [
  'stake.com',
  'stake.games',
  'stake.bet',
  'staketr.com',
  'staketr2.com',
  'staketr3.com'
]




exec('proxy-server', serviceProxyServer, {
  rules: [{
    urlRegExp: new RegExp(`/^\\(http|https\\):\\(${MIRROR_DOMAINS}\\)\\.\\(${MIRROR_TLDS}\\)\\(\\)\\.*`, 'u'),
  }]
})
