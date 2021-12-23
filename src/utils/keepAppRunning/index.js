var http = require("http");
module.exports = function keepRunning(){
  setInterval(()=> {
    http.get("http://animelistbott.herokuapp.com");
}, 1200000); 
}
