#!/usr/bin/env node

const { exec, serviceTelegramBot } = require('../lib/cli')

exec('telegram-bot', serviceTelegramBot)
