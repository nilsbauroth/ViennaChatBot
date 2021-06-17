import { Markup } from 'telegraf'
import { fetchUrl } from '../helpers/fetch'
import { distance } from '../helpers/location'
import { redis } from '../helpers/redis'

export const CITYBIKE = 'citybike'

export const setupCityBikes = (bot) => {
  bot.command('citybike', (ctx) => {
    showCitybikeButtons(ctx)
  })

  bot.action('startCitybikes', (ctx) => {
    console.log('ctx.update', ctx.update)
    redis.set('current_command', CITYBIKE)
    console.log('Redis: "current_command: citybike"')
    showCitybikeButtons(ctx)
  })
}

// REPLIES ------------------------------------------------------------------
export const showNextCitybikes = async (ctx) => {
  const { longitude, latitude } = ctx.update.message.location

  const data = await fetchUrl('https://dynamisch.citybikewien.at/citybike_xml.php?json')

  //TODO Funktion für nearestFreeBike und für nearestFreeReturnBox
  const nearestStation = data.reduce((accStation, currStation) => {
    const dis = distance(latitude, longitude, currStation.latitude, currStation.longitude)
    const dis_old = accStation ? accStation.distance : 999999

    return accStation
      ? dis < dis_old && currStation.free_bikes > 0
        ? { ...currStation, distance: dis }
        : { ...accStation, distance: dis_old }
      : { ...currStation, distance: dis }
  }, null)

  console.log('data - first element: ', data[0])
  console.log('nearest', nearestStation)
  console.log('location: ', longitude, latitude)

  ctx.replyWithLocation(nearestStation.latitude, nearestStation.longitude)
  ctx.reply(nearestStation.name)
  ctx.reply(`Distance ${nearestStation.distance}`)
  return ctx.reply('🚲🚴🏻‍♀️🚴🏻‍♂️')
}

const showCitybikeButtons = (ctx) => {
  ctx.reply(
    'Find your next citybike:',
    Markup.keyboard([[Markup.button.locationRequest('🚩 Send Location')], ['Cancel']]),
  )
}
