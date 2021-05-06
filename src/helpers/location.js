import { CITYBIKE_TEXT, showNextCitybikes } from '../commands/citybikes'

export const setupLocation = (bot) => {
  bot.on('location', (ctx) => {
    const msg = ctx.update.message
    const location = msg.location

    ctx.reply(`lat: ${location.latitude} lon: ${location.longitude}`)

    switch (msg.reply_to_message.text) {
      case CITYBIKE_TEXT:
        showNextCitybikes(ctx)
        break
    }
  })
}
