const axios = require('axios')
const cheerio = require('cheerio')
const url = 'https://animeschedule.net'

async function ScrapperByDays(day,chatID,bot){
  if(day === null){
    bot.sendMessage(idChat,'Por favor, Insira o dia da semana')
    return
  }

  try {
   if(day === 'monday'){

    await axios(url).then(res =>{
      const html = res.data
      const $ = cheerio.load(html)
      const scrap = $('.timetable-column.odd.Monday h2.show-title-bar')
  
      setTimeout(() => {
        scrap.each(function (idx, el) {
          console.log("monday",$(el).text() )
          // bot.sendMessage(chatID,$(el).text())
        });
      }, 3000);

    })

   }else if(day === 'tuesday'){ 

    await axios(url).then(res =>{
      const html = res.data
      const $ = cheerio.load(html)
      const scrap = $('.timetable-column.even.Tuesday h2.show-title-bar')
  
      setTimeout(() => {
        const animes = []
        scrap.each(function (idx, el) {
          animes.push((`📖 ${$(el).text()}\n`))
          
        });
        bot.sendMessage(chatID,animes.toString().replace(/,/g, " "))
      }, 3000);

    })

   }else if(day === 'wednesday'){

    await axios(url).then(res =>{
      const html = res.data
      const $ = cheerio.load(html)
      const scrap = $('.timetable-column.odd.Wednesday h2.show-title-bar')
  
      setTimeout(() => {
        const animes = []
        scrap.each(function (idx, el) {
          animes.push((`📖 ${$(el).text()}\n`))
          
        });
        bot.sendMessage(chatID,animes.toString().replace(/,/g, " "))
      }, 3000);

    })

   }else if(day === 'thursday'){

    await axios(url).then(res =>{
      const html = res.data
      const $ = cheerio.load(html)
      const scrap = $('.timetable-column.even.Thursday h2.show-title-bar')
  
      setTimeout(() => {
        const animes = []
        scrap.each(function (idx, el) {
          animes.push((`📖 ${$(el).text()}\n`))
          
        });
        bot.sendMessage(chatID,animes.toString().replace(/,/g, " "))
      }, 3000);

    })

   }else if(day === 'friday'){

    await axios(url).then(res =>{
      const html = res.data
      const $ = cheerio.load(html)
      const scrap = $('.timetable-column.odd.Friday h2.show-title-bar')
  
      setTimeout(() => {
        const animes = []
        scrap.each(function (idx, el) {
          animes.push((`📖 ${$(el).text()}\n`))
          
        });
        bot.sendMessage(chatID,animes.toString().replace(/,/g, " "))
      }, 3000);

    })

   }else if(day === 'saturday'){

    await axios(url).then(res =>{
      const html = res.data
      const $ = cheerio.load(html)
      const scrap = $('.timetable-column.even.Saturday h2.show-title-bar')
  
      setTimeout(() => {
        const animes = []
        scrap.each(function (idx, el) {
          animes.push((`📖 ${$(el).text()}\n`))
          
        });
        bot.sendMessage(chatID,animes.toString().replace(/,/g, " "))
      }, 3000);

    })

   }else if(day === 'sunday'){

    await axios(url).then(res =>{
      const html = res.data
      const $ = cheerio.load(html)
      const scrap = $('.timetable-column.odd.Sunday h2.show-title-bar')
  
      setTimeout(() => {
        const animes = []
        scrap.each(function (idx, el) {
          animes.push((`📖 ${$(el).text()}\n`))
          
        });
        bot.sendMessage(chatID,animes.toString().replace(/,/g, " "))
      }, 3000);

    })

   }
  } catch (error) {
    console.log('error inscrapperByDay',error)
  }
  
}

module.exports.ScrapperByDays = ScrapperByDays;

