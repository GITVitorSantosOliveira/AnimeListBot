const TelegramBot = require('node-telegram-bot-api');
require('dotenv/config')

const TOKEN = process.env.BOT_TOKEN;
const bot = new TelegramBot(TOKEN, {polling: true});
const { parseDay } = require('./utils/parseDay');
const { timerList } = require('./api/timerList/timerList');
const { getParameters } = require('./utils/tempList/utilsTempList');
const { getAnime } = require('./graphql/schemas/anilist');
const { getAnimeDay } = require('./api/MyAnimeList/apiMyAnimeList');
const getDay = require('./utils/getDay');

const words = ['/start','/templist']

//commands
// bot.on('message', (msg) => {
//   const msgFiltered = msg.text.toString().toLowerCase()
//   const msgChatId = msg.chat.id
//   const userName = msg.from.first_name

//  try {
//   if(words[0] === msgFiltered){
//     bot.sendMessage(msgChatId, 'Hello  ' + userName + '  how are you?');
//     bot.sendMessage(msgChatId, 'Este é um bot de animes digite / e veja as opções: ');
//   }else if(words[1] === msgFiltered){
//     //  if(timerList(msgChatId,bot)){
//     //    return
//     //  }
//   //  getSeasonList(msgChatId,bot,2021,"SUMMER")
//   }

//  } catch (error) {
//   if(error.response.status === 429){
//     bot.sendMessage(msgChatId, 'Muito anime para processar, espera um pouco')
//     setTimeout(() => {
//       return
//     }, 30000);
//   }
//  }
// })

bot.onText(/\/templist (.+)/, (msg,match) => {
  const msgChatId = msg.chat.id
  const dataParameters = getParameters(match)

  console.log(dataParameters)
  try {
     timerList(msgChatId,bot,dataParameters)

  } catch (error) {
  }
})

bot.onText(/\/animeinfo (.+)/, (msg,match) => {
  const msgChatId = msg.chat.id
  const resp = match[1]
  try {
    getAnime(msgChatId,bot,resp)
  } catch (error) {
    console.error('error bot animeInfo',error)
  }
})

bot.onText(/\/animeday (.+)/, (msg,match)=>{
  const msgChatId = msg.chat.id
  const resp = match[1]

  const dayWeek = parseDay(resp,bot)
  try {
    getAnimeDay(dayWeek,msgChatId,bot)
  } catch (error) {
    console.log(error)
  }
})

bot.onText(/\/animeday/, (msg)=> {
  const dayWeek = getDay(msg.from.language_code)
  const dayWeekParsed = parseDay(dayWeek)

  try {
    getAnimeDay(dayWeekParsed,msg.chat.id,bot)
  } catch (error) {
    console.log(error)
  }
});