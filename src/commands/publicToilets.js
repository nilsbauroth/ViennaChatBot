import { Markup } from 'telegraf'
import { escapeMdCharacters } from '../helpers/escapeMdCharacters'
import { fetchUrl } from '../helpers/fetch'
import { distance } from '../helpers/location'
import { redis } from '../helpers/redis'

export const PUBLIC_TOILETS = 'publicToilets'

export const setupPublicToilets = (bot) => {
  bot.command(PUBLIC_TOILETS, (ctx) => {
    showPublicToiletsButtons(ctx)
  })

  bot.action('startPublicToilets', (ctx) => {
    redis.set('current_command', PUBLIC_TOILETS)
    showPublicToiletsButtons(ctx)
  })
}

// REPLIES ------------------------------------------------------------------
export const replyNextPublicToilet = async (ctx) => {
  const { longitude, latitude } = ctx.update.message.location

  const data = await fetchUrl(
    'https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:WCANLAGE2OGD&srsName=EPSG:4326&outputFormat=json',
  )

  const nearestToilet = data.features.reduce((acc, curr) => {
    const isUnisex =
      (curr.properties.KATEGORIE
        ? curr.properties.KATEGORIE.toLowerCase().includes('unisex')
        : false) || (curr.properties.ICON ? curr.properties.ICON === 'U' : false)

    const isActive = curr.properties.AKTIV_TXT === 'JA'

    if (!isUnisex || !isActive) return acc

    const dis = distance(
      latitude,
      longitude,
      curr.geometry.coordinates[1],
      curr.geometry.coordinates[0],
    )
    const dis_old = acc ? acc.distance : 999999

    return acc
      ? dis < dis_old
        ? { ...curr, distance: dis }
        : { ...acc, distance: dis_old }
      : { ...curr, distance: dis }
  }, null)

  console.log('nearest', nearestToilet)

  const street = nearestToilet.properties.STRASSE ? nearestToilet.properties.STRASSE : ''
  const location = nearestToilet.properties.ORTSANGABE
    ? ' ' + escapeMdCharacters(nearestToilet.properties.ORTSANGABE)
    : ''
  const equipment = nearestToilet.properties.AUSSTATTUNG
    ? `Equipment: ${escapeMdCharacters(nearestToilet.properties.AUSSTATTUNG)}`
    : ''
  const openTimes = nearestToilet.properties.OEFFNUNGSZEIT
    ? nearestToilet.properties.OEFFNUNGSZEIT
    : ''

  ctx.reply('🧻🚽')
  ctx.replyWithMarkdownV2(
    `*${street}` +
      `${location}*\n` +
      `${nearestToilet.properties.ICON_TXT}\n` +
      `Distance: ${Math.ceil(nearestToilet.distance)}m \n` +
      `Open: ${openTimes}\n\n` +
      `${equipment}`,
  )

  return ctx.replyWithLocation(
    nearestToilet.geometry.coordinates[1],
    nearestToilet.geometry.coordinates[0],
  )
}

const showPublicToiletsButtons = (ctx) => {
  ctx.reply(
    'Find the next public toilet:',
    Markup.keyboard([[Markup.button.locationRequest('🚩 Send Location')], ['Cancel']]),
  )
}
