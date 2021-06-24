import { Markup } from 'telegraf'

const markupText =
  '*Welcome to the Vienna Chatbot* \n\n' + 'Find following things in your area:'

export const setupStart = (bot) => {
  bot.start((ctx) =>
    ctx.replyWithMarkdownV2(
      markupText,
      Markup.inlineKeyboard([
        [Markup.button.callback('🚲 Nearest Citybikes', 'startCitybikes')],
        [Markup.button.callback('💧 Next Drinking Fountain', 'startDrinkingFountains')],
        [Markup.button.callback('🚾 Next Public Toilet', 'startPublicToilets')],
        [Markup.button.callback('🦠 Next Covid-19 Test Box', 'startCovidTestBox')],
      ]),
    ),
  )
}

export const setupHelp = (bot) => {
  bot.help((ctx) => ctx.reply('Help'))
}
