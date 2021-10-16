#!/usr/bin/env node

const { execService } = require('../lib/cli')
const serviceProxyServer = require('../lib/cli/services/proxy_server')

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

execService('proxy-server', serviceProxyServer, {
})
