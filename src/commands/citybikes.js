import { Markup } from 'telegraf'
import { fetchData } from '../helpers/fetch'

export const CITYBIKE_TEXT = 'Find your next citybike:'

export const setupCityBikes = (bot) => {
  bot.command('citybike', (ctx) => {
    showCitybikeButtons(ctx)
  })

  bot.action('startCitybikes', (ctx) => showCitybikeButtons(ctx))
}

// REPLIES ------------------------------------------------------------------
export const showNextCitybikes = (ctx) => {
  const { longitude, latitude } = ctx.update.message.location

  console.log('location: ', longitude, latitude)
  return ctx.reply('🚲🚴🏻‍♀️🚴🏻‍♂️')
}

const showCitybikeButtons = (ctx) => {
  ctx.reply(
    CITYBIKE_TEXT,
    Markup.keyboard([[Markup.button.locationRequest('🚩 Send Location')]]),
  )
}
