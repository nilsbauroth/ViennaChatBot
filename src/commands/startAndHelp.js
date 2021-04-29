export const setupStart = (bot) => {
  bot.start((ctx) => ctx.reply('Welcome'))
}

export const setupHelp = (bot) => {
  bot.help((ctx) => ctx.reply('Send me a sticker'))
}
