import { Markup } from 'telegraf'
import { fetchUrl } from '../helpers/fetch'
import { distance, forwardGeocode } from '../helpers/location'
import { redis } from '../helpers/redis'
import { escapeMdCharacters } from '../helpers/escapeMdCharacters'

export const COVID_TEST_BOX = 'covidTestBox'

export const setupCovidTestBox = (bot) => {
  bot.command(COVID_TEST_BOX, (ctx) => {
    showCovidTestBoxButtons(ctx)
  })

  bot.action('startCovidTestBox', (ctx) => {
    redis.set('current_command', COVID_TEST_BOX)
    showCovidTestBoxButtons(ctx)
  })
}

// REPLIES ------------------------------------------------------------------
export const replyNextCovidTestBox = async (ctx) => {
  const { longitude, latitude } = ctx.update.message.location

  const data = await fetchUrl(
    'https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:COVIDTESTSTRASSEOGD&srsName=EPSG:4326&outputFormat=json',
  )

  const coordinates = await Promise.all(
    data.features.map(async (curr) => await forwardGeocode(curr.properties.ADDRESSE)),
  )

  const nearest = data.features.reduce((acc, curr, idx) => {
    const result = coordinates[idx]

    if (!result) return acc
    if (!(!!result.lat && !!result.lng)) return acc

    const { lat: boxLat, lng: boxLng } = result

    const dis = distance(latitude, longitude, boxLat, boxLng)
    const dis_old = acc ? acc.distance : 999999

    return acc
      ? dis < dis_old
        ? { ...curr, distance: dis }
        : { ...acc, distance: dis_old }
      : { ...curr, distance: dis }
  }, null)

  const address = nearest.properties.ADDRESSE
    ? escapeMdCharacters(nearest.properties.ADDRESSE)
    : ''
  const text = nearest.properties.OEFFNUNGSZEIT
    ? escapeMdCharacters(nearest.properties.OEFFNUNGSZEIT)
    : ''
  const distanceString = escapeMdCharacters(Math.ceil(nearest.distance).toString())

  ctx.reply('🦠😷')
  ctx.replyWithMarkdownV2(
    `*${escapeMdCharacters(nearest.properties.NAME)}*\n` +
      `${address}\n` +
      `Distance: ${distanceString}m \n\n` +
      `${text}\n`,
  )

  return ctx.replyWithLocation(
    nearest.geometry.coordinates[1],
    nearest.geometry.coordinates[0],
  )
}

const showCovidTestBoxButtons = (ctx) => {
  ctx.reply(
    'Find the next Covid-19 Check-Box:',
    Markup.keyboard([[Markup.button.locationRequest('🚩 Send Location')], ['Cancel']]),
  )
}
