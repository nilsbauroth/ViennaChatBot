require('dotenv').config()
require('@babel/core').transform('code', {
  presets: ['@babel/preset-env'],
})

import TelegramBot from 'node-telegram-bot-api'
import { setupHelp, setupStart } from './commands/startAndHelp'
import { setupCityBikes, setupCityBikes2 } from './commands/citybikes'

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true })
console.log('bot is running')

setupStart(bot)
setupHelp(bot)
setupCityBikes(bot)

bot.on('polling_error', console.log)

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
