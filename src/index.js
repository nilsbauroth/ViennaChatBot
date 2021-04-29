require('dotenv').config()
require('@babel/core').transform('code', {
  presets: ['@babel/preset-env'],
})

import { Telegraf } from 'telegraf'
import { setupHelp, setupStart } from './commands/startAndHelp'

const bot = new Telegraf(process.env.BOT_TOKEN)
console.log('bot is running')

setupStart(bot)
setupHelp(bot)

bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
