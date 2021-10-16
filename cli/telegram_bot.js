#!/usr/bin/env node

const { exec, services } = require('../lib/cli')
const { serviceTelegramBot } = services

exec('telegram-bot', serviceTelegramBot)
