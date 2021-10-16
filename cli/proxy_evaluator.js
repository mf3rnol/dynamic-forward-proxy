#!/usr/bin/env node

const { execService } = require('../lib/cli')
const serviceProxyEvaluator = require('../lib/cli/services/proxy_evaluator')

execService('proxy-evaluator', serviceProxyEvaluator)
