const axios = require('axios')
// async function getAnimeList() {
    const getDataApi = async (query, variables) => {
        

        try {
          const response = await axios.post("https://graphql.anilist.co", {
            query,
            variables
          });
          return response.data
        } catch (error) {
          // If there's an error, set the error to the state
          console.log(error);
        }
        //
      };
     
        // const query = `
        // query {
        //     Page(page: 0, perPage: 5){
        //         media (seasonYear: 2021,season: SUMMER, type: ANIME,format: TV,sort: TITLE_NATIVE) {
        //            title {
        //              romaji
        //            }
        //          }
        //      }
        // }
        // `;
        // const variables = {};
        // getData(query, variables);
// }

module.exports.getDataApi = getDataApi;