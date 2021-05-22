import { Markup } from 'telegraf'

export const setupStart = (bot) => {
  bot.start((ctx) =>
    ctx.reply(
      '**Welcome**',
      Markup.inlineKeyboard([
        [Markup.button.callback('Share Location', 'shareLocation')],
        [Markup.button.callback('🚲 Nearest Citybikes', 'startCitybikes')],
        [Markup.button.callback('🚮 Next Recycling', 'startRecycling')],
      ]),
    ),
  )
}

export const setupHelp = (bot) => {
  bot.help((ctx) => ctx.reply('Help'))
}
