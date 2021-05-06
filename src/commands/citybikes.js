import { Markup } from 'telegraf'
import { fetchData } from '../helpers/fetch'

export const setupCityBikes = (bot) => {
  bot.onText(/\/bike/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Contact and Location request', {
      reply_markup: JSON.stringify({
        keyboard: [
          [{ text: 'Location', request_location: true }],
          [{ text: 'Contact', request_contact: true }],
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
      }),
    })
  })

  bot.on('location', (msg) => {
    console.log(msg.location.latitude)
    console.log(msg.location.longitude)
  })

  bot.on('callback_query', (callbackQuery) => {
    const action = callbackQuery.data

    console.log('ballback', callbackQuery)

    if (action === 'nearestCitybike') {
      fetchData.fetchUrl('https://dynamisch.citybikewien.at/citybike_xml.php?json')
      console.log('fetched')
    }
  })
}
