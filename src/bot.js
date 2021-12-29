const TelegramBot = require('node-telegram-bot-api');
require('dotenv/config')

const TOKEN = process.env.BOT_TOKEN;
const bot = new TelegramBot(TOKEN, {polling: true});
const { parseDay } = require('./utils/parseParameters/parseDay');
const { getParameters } = require('./utils/tempList/utilsGetParameters');
const { getAnime, getSeasonList } = require('./graphql/schemas/anilist');
// const { MALAnimeDay } = require('./api/MyAnimeList/MALAnimeDay');
// const getDay = require('./utils/getDay');
const keepRunning  = require('./utils/keepAppRunning');

// config for heroku web start
const express = require('express');
const { ScrapperByDays } = require('./api/WebScrapper/ScrapperByDays');
const { CurrentDay } = require('./api/WebScrapper/CurrentDay');

const app = express()
app.use(express.json())

const port = process.env.PORT || 3000
app.listen(port,() => {
  console.log('listening on port ' + port)
})

app.get('/', (_req, res) => {
  res.send('<h1>Heelo! Im an bot for telegram, and you can find me on here: @listsofanimebot </h1>')
})
///keep app running
keepRunning()
//start command
bot.onText(/\/start/, (msg)=>{
  const msgChatId = msg.chat.id

  bot.sendMessage(msgChatId, 'Olá esse é um bot NÃO OFICIAL de animes, baseado no MAL e ANILIST.')
  bot.sendMessage(msgChatId, 'digite /help para ver as opções')

})

//help commander
bot.onText(/\/help/, (msg)=>{
  const msgChatId = msg.chat.id

  bot.sendMessage(msgChatId,
  `O comando /templist recebe Ano,Temporada,Formato(TV or Movie) digite em ingles para obter os resultados\n
  winter - inverno\n spring - primavera\n summer - verao\n fall - outono\n\n
  Exemplo: templist 2021,fall,tv
  `)
  bot.sendMessage(msgChatId, `O comando /animeinfo recebe o nome do anime e o formato(TV or Movie)\n\n
  Exemplo: animeinfo sword art online,tv
  `)
  bot.sendMessage(msgChatId, `O comando /animeday pode receber o dia da semana ou não\n\n
  Exemplo: animeday segunda
  `)
})

bot.onText(/\/templist (.+)/, (msg,match) => {
  const msgChatId = msg.chat.id
  const dataParameters = getParameters(match)
  try {
    bot.sendMessage(msgChatId, "In Maintenance")
    // bot.sendMessage(msgChatId,"Aguarde 10 segundos :)")
    // getSeasonList(msgChatId,bot,dataParameters.year,dataParameters.season,dataParameters.format)
    // timerList(msgChatId,bot,dataParameters)

  } catch (error) {
    console.log(error)
  }
})

bot.onText(/\/animeinfo (.+)/, (msg,match) => {
  const msgChatId = msg.chat.id

  const matchSplited = match[1].trim().split(',')
  const animeName = matchSplited[0]
  const format = matchSplited[1].toUpperCase()

  try {
    getAnime(msgChatId,bot,animeName,format)
  } catch (error) {
    bot.sendMessage(idChat,'Por Favor, verifique a o que você escreveu. Dados permitidos: nome do anime , TV ou MOVIE')
  }
})

//request by mal
// bot.onText(/\/animeday (.+)/, (msg,match)=>{
//   const msgChatId = msg.chat.id
//   const resp = match[1]

//   const dayWeek = parseDay(resp,bot)
//   try {
//     MALAnimeDay(dayWeek,msgChatId,bot)
//   } catch (error) {
//     console.log(error)
//   }
// })

// bot.onText(/\/animeday/, (msg)=> {
//   const dayWeek = getDay(msg.from.language_code)
//   const dayWeekParsed = parseDay(dayWeek)

//   try {
//     getAnimeDay(dayWeekParsed,msg.chat.id,bot)
//   } catch (error) {
//     console.log(error)
//   }
// });

//request by scrapper
bot.onText(/\/animeday (.+)/, (msg,match)=>{
    const msgChatId = msg.chat.id
    const resp = match[1]

    const dayWeek = parseDay(resp,bot)
    try {
      ScrapperByDays(dayWeek,msgChatId,bot)
    } catch (error) {
      console.log(error)
    }
  })

bot.onText(/\/animeday/, (msg)=> {
    try {
      CurrentDay(msg.text,msg.chat.id,bot)
    } catch (error) {
      console.log('error in catch bot',error)
    }
  });