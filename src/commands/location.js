import { Markup } from 'telegraf'
import { redis } from '../helpers/redis'
import { replyNextCitybikes, CITYBIKE } from './citybikes'
import { replyNextDrinkingFountains, DRINKING_FOUNTAINS } from './drinkingFountains'

export const setupLocation = (bot) => {
  bot.on('location', (ctx) => {
    const msg = ctx.update.message
    const location = msg.location

    ctx.replyWithMarkdownV2(
      `*Your Location* \nlat: ${location.latitude} \nlon: ${location.longitude}`,
    )

    redis.get('current_command').then((res) => {
      switch (res) {
        case CITYBIKE:
          replyNextCitybikes(ctx)
          break
        case DRINKING_FOUNTAINS:
          replyNextDrinkingFountains(ctx)
          break
      }
    })
  })

  bot.action('shareLocation', (ctx) => {
    showLocationSharingButtons(ctx)
  })
}

const showLocationSharingButtons = (ctx) => {
  ctx.reply(
    'Give us your location:',
    Markup.keyboard([[Markup.button.locationRequest('🚩 Send Location')], ['Cancel']]),
  )
}