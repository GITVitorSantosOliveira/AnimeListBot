const { getDataApi } = require("../../api/Anilist/apiAnilist");

const getSeasonList = async (idChat, bot, year, season, format) => {
  try {
    const query = `
  query($seasonYear: Int!,$season: MediaSeason!,$format: MediaFormat!){
    Page(page: 0, perPage: 50) {
   media(season: $season, seasonYear: $seasonYear, type: ANIME, format: $format, sort: TITLE_ROMAJI) {
     title {
       romaji
     }
   }
 }
 }
  `
    var variables = {
      seasonYear: year,
      season: season,
      format: format != null ? format : "TV"
    };

    const dataApi = await getDataApi(query, variables);
    const getResponse = dataApi.data.Page.media
    getResponse.forEach(anime => {
      bot.sendMessage(idChat, anime.title.romaji)
    });
  } catch (error) {
    console.error('error in getSeasonList', error)
    bot.sendMessage(idChat, 'Por Favor, verifique a o que você mandou. Dados permitidos: ano,temporada,formato')
  }
}

module.exports.getSeasonList = getSeasonList;

const getAnime = async (idChat, bot, animeName, format) => {
  try {
    const query = `
    query($search: String!,$format: MediaFormat!){
      Page(page: 0,perPage: 5){
       media(search: $search,format: $format) {
        title {
          romaji
        }
       format,
       status,
       seasonYear,
       description(asHtml: false),
       trailer {
         id
       },
       coverImage {
         large
       },
       genres
      }
     }
      
    
    }
  `
    var variables = {
      search: animeName,
      format
    };

    const dataApi = await getDataApi(query, variables);
    const getResponse = dataApi.data.Page.media
    getResponse.forEach(anime => {
      const animelength = anime.description.split('')

      const dataJson = {
        title: anime.title.romaji,
        image: anime.coverImage.large,
        synopsis: anime.description.slice(animelength, 200),
        type: anime.format,
        status: anime.status,
        seasonYear: anime.seasonYear,
        genres: anime.genres,
        trailer: anime.trailer?.id != undefined ? `https://www.youtube.com/watch?v=${anime.trailer?.id}` : "sem trailer"
      }

      // ${bot.sendPhoto(idChat,dataJson.image)}\n
      // `Titulo: ${dataJson.title}\nSinopse: ${dataJson.synopsis}\nTipo: ${dataJson.type}
      //      \nStatus: ${dataJson.status}\nAno: ${dataJson.seasonYear}\nGêneros: ${dataJson.genres}
      //      \nTrailer: [trailer](${dataJson.trailer})
      // //      `
      // ${dataJson.trailer}
      bot.sendPhoto(idChat,dataJson.image,
        {
          caption: `<b>Titulo: </b> ${dataJson.title}\n<b>Sinopse: </b> ${dataJson.synopsis}\n<b>Tipo: </b> ${dataJson.type}
                \n<b>Status: </b> ${dataJson.status}\n<b>Ano: </b> ${dataJson.seasonYear}\n<b>Gêneros: </b> ${dataJson.genres}
                \n<b>Trailer: </b> <a href="${dataJson.trailer}">trailer</a>
                `,
          parse_mode: 'HTML'
        }
        
      )
    });

  } catch (error) {
    console.error({ errorGetAnime: error })
    bot.sendMessage(idChat, 'Por Favor, verifique a o que você escreveu. Dados permitidos: nome do anime , TV ou MOVIE')
  }
}

module.exports.getAnime = getAnime;