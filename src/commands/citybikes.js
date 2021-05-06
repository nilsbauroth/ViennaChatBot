import { Markup } from 'telegraf'

const sendLiveLocation = (ctx) => {
  ctx.replyWithLocation().then((message) => {
    console.log('mess', message)

    const lat = message.location.latitude
    const lon = message.location.longitude

    console.log('lat', lat)
    console.log('lon', lon)

    ctx.telegram
      .editMessageLiveLocation(lat, lon, message.chat.id, message.message_id)
      .catch(() => console.log('error'))
  })
}

const getLocation = (message) => {
  console.log(JSON.stringify(message))
}

export const setupCityBikes = (bot) => {
  bot.command('citybike', (ctx) => {
    ctx.reply(
      'Choose',
      Markup.keyboard([
        ['🚩 Send Location'],
        [Markup.button.locationRequest('send location')],
      ]),
    )

    getLocation(ctx.update.message)
  })

  bot.hears('🚩 Send Location', sendLiveLocation)
}
