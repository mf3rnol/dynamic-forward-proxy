#!/usr/bin/env node

const { exec, serviceProxyEvaluator } = require('../lib/cli')

exec('proxy-evaluator', serviceProxyEvaluator)
