const axios = require('axios');

 async function getAnimeDay(day,idChat,bot){
   if(day === null){
     bot.sendMessage(idChat,'Por favor, Insira o dia da semana')
     return
   }

   try {
    if(day === 'monday'){

      await axios.get(`https://api.jikan.moe/v3/schedule/${day}`)
   .then(response => {
     const data = response.data.monday
     setTimeout(() => {
    data.forEach(anime=>{
        bot.sendMessage(idChat,anime.title)
      })
    }, 5000);
   })

    }else if(day === 'tuesday'){ 

      await axios.get(`https://api.jikan.moe/v3/schedule/${day}`)
   .then(response => {
     const data = response.data.tuesday
     setTimeout(() => {
      data.forEach(anime=>{
          bot.sendMessage(idChat,anime.title)
        })
      }, 5000);
   })

    }else if(day === 'wednesday'){

      await axios.get(`https://api.jikan.moe/v3/schedule/${day}`)
   .then(response => {
     const data = response.data.wednesday
     setTimeout(() => {
      data.forEach(anime=>{
          bot.sendMessage(idChat,anime.title)
        })
      }, 5000);

   })

    }else if(day === 'thursday'){

      await axios.get(`https://api.jikan.moe/v3/schedule/${day}`)
   .then(response => {
     const data = response.data.thursday
     setTimeout(() => {
      data.forEach(anime=>{
          bot.sendMessage(idChat,anime.title)
        })
      }, 5000);

   })

    }else if(day === 'friday'){

      await axios.get(`https://api.jikan.moe/v3/schedule/${day}`)
   .then(response => {
     const data = response.data.friday
     setTimeout(() => {
      data.forEach(anime=>{
          bot.sendMessage(idChat,anime.title)
        })
      }, 5000);

   })

    }else if(day === 'saturday'){

      await axios.get(`https://api.jikan.moe/v3/schedule/${day}`)
   .then(response => {
     const data = response.data.saturday
     setTimeout(() => {
      data.forEach(anime=>{
          bot.sendMessage(idChat,anime.title)
        })
      }, 5000);

   })

    }else if(day === 'sunday'){

      await axios.get(`https://api.jikan.moe/v3/schedule/${day}`)
   .then(response => {
     const data = response.data.sunday
     setTimeout(() => {
      data.forEach(anime=>{
          bot.sendMessage(idChat,anime.title)
        })
      }, 5000);

   })

    }
   } catch (error) {
     console.log(error)
   }
   
 }

 module.exports.getAnimeDay = getAnimeDay;