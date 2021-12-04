const axios = require('axios')
// async function getAnimeList() {
    const getDataApi = async (query, variables) => {
        try {
          const response = await axios.post("https://graphql.anilist.co", {
            query,
            variables
          });
          console.log({getDataApi: response.data})
          return response?.data
        } catch (error) {
          console.log({errorGetDataApi: error});
        }
      };

module.exports.getDataApi = getDataApi;