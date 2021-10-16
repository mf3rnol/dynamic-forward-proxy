#!/usr/bin/env node

const { exec, services } = require('../lib/cli')
const { serviceProxyServer } = services

exec('proxy-server', serviceProxyServer)
