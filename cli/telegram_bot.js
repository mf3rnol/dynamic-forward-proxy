#!/usr/bin/env node

const { execService } = require('../lib/cli')
const serviceTelegramBot = require('../lib/cli/services/telegram_bot')

execService('telegram-bot', serviceTelegramBot)
