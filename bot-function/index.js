require('dotenv').config()
require('@babel/core').transform('code', {
  presets: ['@babel/preset-env'],
})
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import * as functions from 'firebase-functions'
import { Telegraf } from 'telegraf'
import { setupHelp, setupStart } from './commands/startAndHelp'
import { setupCityBikes } from './commands/citybikes'
import { setupLocation } from './commands/location'

const bot = new Telegraf(functions().config.telegrambot.key || process.env.BOT_TOKEN)
console.log('bot is running')

setupStart(bot)
setupHelp(bot)
setupLocation(bot)
setupCityBikes(bot)

bot.launch()

exports.bot = functions.https.onRequest((req, res) => {
  bot.handleUpdate(req.body, res)
})

/*  LEARNINGS
    - bot.action funktioniert scheinbar nur mit Markup.inlineKeyboard
    - in Markup.inlineKeyboard kann man keine location buttons hinzufügen,  
      nur callback buttons
    - mit bot.on('location') reagiert man auf das "event", wenn eine map
      in den chat gesendet wird
*/

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

/**
 *  1. Message: to show you the nearest places we need to acces your location
 *  2. location bekommen und in DB speichern
 *  3.
 */
