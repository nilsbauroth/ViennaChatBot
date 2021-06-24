import { Markup } from 'telegraf'
import { escapeMdCharacters } from '../helpers/escapeMdCharacters'
import { fetchUrl } from '../helpers/fetch'
import { distance } from '../helpers/location'
import { redis } from '../helpers/redis'

export const DRINKING_FOUNTAINS = 'drinkingFountains'

export const setupDrinkingFountains = (bot) => {
  bot.command(DRINKING_FOUNTAINS, (ctx) => {
    showDrinkingFountainsButtons(ctx)
  })

  bot.action('startDrinkingFountains', (ctx) => {
    redis.set('current_command', DRINKING_FOUNTAINS)
    showDrinkingFountainsButtons(ctx)
  })
}

// REPLIES ------------------------------------------------------------------
export const replyNextDrinkingFountains = async (ctx) => {
  const { longitude, latitude } = ctx.update.message.location

  const data = await fetchUrl(
    'https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:TRINKBRUNNENOGD&srsName=EPSG:4326&outputFormat=json',
  )

  const nearestFountain = data.features.reduce((acc, currFountain) => {
    const isDrinkingFountain = [
      'Trinkbrunnen',
      'Trinkbrunnen mit Tränke',
      'Mobiler Trinkbrunnen mit Sprühnebelfunktion',
    ].includes(currFountain.properties.NAME)

    if (!isDrinkingFountain) return acc

    const dis = distance(
      latitude,
      longitude,
      currFountain.geometry.coordinates[1],
      currFountain.geometry.coordinates[0],
    )
    const dis_old = acc ? acc.distance : 999999

    return acc
      ? dis < dis_old
        ? { ...currFountain, distance: dis }
        : { ...acc, distance: dis_old }
      : { ...currFountain, distance: dis }
  }, null)

  ctx.reply('💧🚰')
  ctx.replyWithMarkdownV2(
    `*${
      nearestFountain.properties
        ? escapeMdCharacters(nearestFountain.properties.NAME)
        : ''
    }*\n` + `Distance: ${Math.ceil(nearestFountain.distance)}m \n`,
  )

  return ctx.replyWithLocation(
    nearestFountain.geometry.coordinates[1],
    nearestFountain.geometry.coordinates[0],
  )
}

const showDrinkingFountainsButtons = (ctx) => {
  ctx.reply(
    'Find your next drinking fountain:',
    Markup.keyboard([[Markup.button.locationRequest('🚩 Send Location')], ['Cancel']]),
  )
}
