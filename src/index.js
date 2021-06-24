/* eslint-disable no-undef */
require('dotenv').config()
require('@babel/core').transform('code', {
  presets: ['@babel/preset-env'],
})

import { Telegraf } from 'telegraf'
import { setupHelp, setupStart } from './commands/startAndHelp'
import { setupCityBikes } from './commands/citybikes'
import { setupLocation } from './commands/location'
import { setupDrinkingFountains } from './commands/drinkingFountains'

const bot = new Telegraf(process.env.BOT_TOKEN)
console.log('bot is running')

setupStart(bot)
setupHelp(bot)
setupLocation(bot)
setupCityBikes(bot)
setupDrinkingFountains(bot)

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

/*  LEARNINGS
    - bot.action funktioniert scheinbar nur mit Markup.inlineKeyboard
    - in Markup.inlineKeyboard kann man keine location buttons hinzufügen,  
      nur callback buttons
    - mit bot.on('location') reagiert man auf das "event", wenn eine map
      in den chat gesendet wird
*/