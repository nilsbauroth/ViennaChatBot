import { Markup } from 'telegraf'
import { fetchUrl } from '../helpers/fetch'
import { distance } from '../helpers/location'

export const CITYBIKE_TEXT = 'Find your next citybike:'

export const setupCityBikes = (bot) => {
  bot.command('citybike', (ctx) => {
    showCitybikeButtons(ctx)
  })

  bot.action('startCitybikes', (ctx) => showCitybikeButtons(ctx))
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
    CITYBIKE_TEXT,
    Markup.keyboard([[Markup.button.locationRequest('🚩 Send Location')]]),
  )
}
