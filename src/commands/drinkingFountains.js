import { Markup } from 'telegraf'
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

  console.log('edata', data.features[0])

  const dd = data.features.reduce((acc, curr) => [...acc, curr.properties.NAME], [])
  console.log(dd)

  //TODO: Funktion für nearestFreeBike und für nearestFreeReturnBox
  const nearestFountains = data.features.reduce((acc, currFountain) => {
    const dis = distance(
      latitude,
      longitude,
      currFountain.geometry.coordinates[1],
      currFountain.geometry.coordinates[0],
    )
    const dis_old = acc ? acc.distance : 999999

    // https://www.data.gv.at/katalog/dataset/2ed52078-7e55-40ea-8036-0d89118a06f4
    return [
      ...acc,
      acc
        ? dis < dis_old
          ? { ...currFountain, distance: dis }
          : { ...acc, distance: dis_old }
        : { ...currFountain, distance: dis },
    ]
  }, null)

  ctx.reply('💧🚰')
  nearestFountains.forEach((nearest) => {
    ctx.replyWithMarkdownV2(
      `*${nearest.properties ? nearest.properties.NAME : ''}*\n` +
        `Distance: ${Math.ceil(nearest.distance)}m \n`,
    )

    ctx.replyWithLocation(
      nearest.geometry.coordinates[1],
      nearest.geometry.coordinates[0],
    )
  })
}

const showDrinkingFountainsButtons = (ctx) => {
  ctx.reply(
    'Find your next drinking fountain:',
    Markup.keyboard([[Markup.button.locationRequest('🚩 Send Location')], ['Cancel']]),
  )
}
