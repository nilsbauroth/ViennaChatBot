import { Markup } from 'telegraf'

export const setupStart = (bot) => {
  bot.start((ctx) =>
    ctx.reply(
      'Welcome',
      Markup.keyboard([['🚲 Nearest Citybikes'], ['🚮 Next Recycling']]),
    ),
  )
}

export const setupHelp = (bot) => {
  bot.help((ctx) => ctx.reply('Send me a sticker'))
}
