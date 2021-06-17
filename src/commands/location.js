import { Markup } from 'telegraf'
import { showNextCitybikes, CITYBIKE } from './citybikes'
import { redis } from '../helpers/redis'

export const setupLocation = (bot) => {
  bot.on('location', (ctx) => {
    const msg = ctx.update.message
    const location = msg.location

    ctx.reply(`lat: ${location.latitude} lon: ${location.longitude}`)

    // TODO: save location data to redis

    redis.get('current_command').then((res) => {
      console.log(res)

      switch (res) {
        case CITYBIKE:
          console.log('CITYBIKE CASE')
          showNextCitybikes(ctx)
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
