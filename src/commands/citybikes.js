import { Markup } from 'telegraf'
import { escapeMdCharacters } from '../helpers/escapeMdCharacters'
import { fetchUrl } from '../helpers/fetch'
import { distance } from '../helpers/location'
import { redis } from '../helpers/redis'

export const CITYBIKE = 'citybike'

export const setupCityBikes = (bot) => {
  bot.command('citybike', (ctx) => {
    showCitybikeButtons(ctx)
  })

  bot.action('startCitybikes', (ctx) => {
    redis.set('current_command', CITYBIKE)
    showCitybikeButtons(ctx)
  })
}

// REPLIES ------------------------------------------------------------------
export const replyNextCitybikes = async (ctx) => {
  const { longitude, latitude } = ctx.update.message.location

  const data = await fetchUrl('https://dynamisch.citybikewien.at/citybike_xml.php?json')

  const nearestStation = data.reduce((accStation, currStation) => {
    const dis = distance(latitude, longitude, currStation.latitude, currStation.longitude)
    const dis_old = accStation ? accStation.distance : 999999

    return accStation
      ? dis < dis_old && currStation.free_bikes > 0
        ? { ...currStation, distance: dis }
        : { ...accStation, distance: dis_old }
      : { ...currStation, distance: dis }
  }, null)

  const distanceString = escapeMdCharacters(Math.ceil(nearestStation.distance).toString())

  ctx.reply('🚴🏻‍♀️🚴🏻‍♂️')
  ctx.replyWithMarkdownV2(
    `*${escapeMdCharacters(nearestStation.name)}*\n` +
      `${escapeMdCharacters(nearestStation.description)}\n\n` +
      `Distance: ${distanceString}m \n` +
      `Free Bikes: ${nearestStation.free_bikes}\n` +
      `Free Return Boxes: ${nearestStation.free_boxes}`,
  )
  return ctx.replyWithLocation(nearestStation.latitude, nearestStation.longitude)
}

const showCitybikeButtons = (ctx) => {
  ctx.reply(
    'Find your next citybike:',
    Markup.keyboard([[Markup.button.locationRequest('🚩 Send Location')], ['Cancel']]),
  )
}
