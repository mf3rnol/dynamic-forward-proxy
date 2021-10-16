#!/usr/bin/env node

const { exec, services } = require('../lib/cli')
const { serviceProxyEvaluator } = services

exec('proxy-evaluator', serviceProxyEvaluator)
