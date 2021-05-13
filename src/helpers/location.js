import { showNextCitybikes } from '../commands/citybikes'

export const setupLocation = (bot) => {
  bot.on('location', (ctx) => {
    const msg = ctx.update.message
    const location = msg.location

    ctx.reply(`lat: ${location.latitude} lon: ${location.longitude}`)

    console.log('message', msg)

    showNextCitybikes(ctx)

    /*
    switch (msg.reply_to_message.text) {
      case CITYBIKE_TEXT:
        
        break
    }
    */
  })
}

// lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)
// lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)
// unit = the unit you desire for results
//                  'K' is kilometers

export const distance = (lat1, lon1, lat2, lon2) => {
  if (lat1 == lat2 && lon1 == lon2) {
    return 0
  } else {
    const radlat1 = (Math.PI * lat1) / 180
    const radlat2 = (Math.PI * lat2) / 180
    const theta = lon1 - lon2
    const radtheta = (Math.PI * theta) / 180

    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)

    if (dist > 1) {
      dist = 1
    }

    dist = Math.acos(dist)
    dist = (dist * 180) / Math.PI
    dist = dist * 60 * 1.1515

    dist = dist * 1.609344 // to kilometer

    return dist
  }
}
