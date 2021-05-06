import { Markup } from 'telegraf'

export const setupStart = (bot) => {
  bot.onText(/\/start/, (msg) =>
    bot.sendMessage(msg.chat.id, 'Welcome', {
      reply_markup: JSON.stringify({
        keyboard: [['🚲 Nearest Citybikes'], ['🚮 Next Recycling']],
      }),
    }),
  )
}

export const setupHelp = (bot) => {
  bot.onText(/\/help/, (msg, match) => bot.sendMessage(msg.chat.id, 'Help'))
}
