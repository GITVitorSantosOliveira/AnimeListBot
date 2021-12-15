
const jikanjs  = require('jikanjs');
const axios = require('axios');

async function getList(year,season,idChat,bot) {
  await jikanjs.loadSeason(year, season).then((response) => {
    const dataSorted = []
    response.anime.forEach(anime => {
      dataSorted.push(anime.title)
  })

  dataSorted.sort()

  setTimeout(() => {
    
 for (let i = 0; i < dataSorted.length; i++) {
  bot.sendMessage(idChat,dataSorted[i])
}

  },30000);
}).catch((err) => {
    // console.error('api message',err); 
  });
}
 module.exports.getList = getList;

 async function getAnimeInfo(animeName,idChat,bot){
  
  await axios.get(`https://api.jikan.moe/v3/search/anime?q=${animeName}
  $order_by=title&sort=asc&limit=5`)
    .then(response => {
      const data = response.data.results
      data.forEach(anime => {
        const animelength = anime.synopsis.split('')
        animelength.length
        const dataJson = {
          titulo: anime.title,
          image: anime.image_url,
          sinopse : anime.synopsis.slice(animelength,200),
          tipo: anime.type,
          Airing: (anime.airing === true) ? 'Em Lançamento' : 'Vai lançar ou já terminou',
        }
        // ${bot.sendPhoto(idChat,dataJson.image)}\n
        bot.sendPhoto(idChat,
          dataJson.image,
           {caption: `titulo:${dataJson.titulo}\n
           Sinopse: ${dataJson.sinopse}\n
           Tipo: ${dataJson.tipo}\n
           Airing: ${dataJson.Airing}\n
           ` } 
           )
      })
       
    })
    .catch(error => {
      console.log(error);
    });
 }

 module.exports.getAnimeInfo = getAnimeInfo;

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
    data.forEach(anime=>{
      bot.sendMessage(idChat,anime.title)
    })
   })

    }else if(day === 'tuesday'){ 

      await axios.get(`https://api.jikan.moe/v3/schedule/${day}`)
   .then(response => {
     const data = response.data.tuesday
    data.forEach(anime=>{
      bot.sendMessage(idChat,anime.title)
    })
   })

    }else if(day === 'wednesday'){

      await axios.get(`https://api.jikan.moe/v3/schedule/${day}`)
   .then(response => {
     const data = response.data.wednesday
    data.forEach(anime=>{
      bot.sendMessage(idChat,anime.title)
    })

   })

    }else if(day === 'thursday'){

      await axios.get(`https://api.jikan.moe/v3/schedule/${day}`)
   .then(response => {
     const data = response.data.thursday
    data.forEach(anime=>{
      bot.sendMessage(idChat,anime.title)
    })

   })

    }else if(day === 'friday'){

      await axios.get(`https://api.jikan.moe/v3/schedule/${day}`)
   .then(response => {
     const data = response.data.friday
    data.forEach(anime=>{
      bot.sendMessage(idChat,anime.title)
    })

   })

    }else if(day === 'saturday'){

      await axios.get(`https://api.jikan.moe/v3/schedule/${day}`)
   .then(response => {
     const data = response.data.saturday
    data.forEach(anime=>{
      bot.sendMessage(idChat,anime.title)
    })

   })

    }else if(day === 'sunday'){

      await axios.get(`https://api.jikan.moe/v3/schedule/${day}`)
   .then(response => {
     const data = response.data.sunday
    data.forEach(anime=>{
      bot.sendMessage(idChat,anime.title)
    })

   })

    }
   } catch (error) {
     console.log(error)
   }
   
 }

 module.exports.getAnimeDay = getAnimeDay;