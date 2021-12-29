const axios = require('axios')
const cheerio = require('cheerio')
const url = 'https://animeschedule.net'

async function CurrentDay(msg,chatID,bot){
  const text = msg.split(' ')[1]
  if(text?.length > 0 || text != undefined) {
    return
  }

  try {
    await axios(url).then(res =>{
      const html = res.data
      const $ = cheerio.load(html)
      const scrap = $('#active-day h2.show-title-bar')

      setTimeout(() => {
        const animes = []
        scrap.each(function (idx, el) {
          animes.push((`📖 ${$(el).text()}\n`))
          
        });
        bot.sendMessage(chatID,animes.toString().replace(/,/g, " "))
      }, 3000);

    })
  } catch (error) {
    console.error('error in function current day', error)
  }
  
}
module.exports.CurrentDay = CurrentDay;
