const fs = require('fs');
const { getSeasonList } = require('../../graphql/schemas/anilist');

async function timerList(idChat,bot,dataParameters){
  const file = 'timerlist.json'
 try {
  await loadJson(file,idChat,bot,dataParameters);
 } catch (error) {
   console.log('error timerlist', error)
 }
}

  function loadJson(filename,idChat,bot,dataParameters){
    const dataRead = JSON.parse(fs.readFileSync(filename))
    var date = new Date()
    var currentHour = date.getHours()
    var currentDate = date.getDate().toLocaleString()
    var is_true = false
    dataRead.groups.forEach((data,idx) =>{
      if(data.id === idChat){
        const hourSplited = data.hour.split(':')
        const sumHour = parseInt(hourSplited[0]) + 1
        if(currentHour >= sumHour || currentDate != data.date){
            getSeasonList(idChat,bot,dataParameters.year,dataParameters.season,dataParameters.format)
          
            dataRead.groups.splice(idx,1)

          const dataChat = { 
            id: idChat, 
            hour: `${currentHour}`,
            date: `${currentDate}` 
        };
        
          dataRead.groups.push(dataChat)
          fs.writeFileSync('timerlist.json',JSON.stringify(dataRead,null,2));
          return is_true = true

        }else{
          bot.sendMessage(idChat, `Espere até ${sumHour} horas para pode mandar o comando novamente!`)
          return is_true =true
        }
      }
    })
    
    if(!is_true){
        getSeasonList(idChat,bot,dataParameters.year,dataParameters.season,dataParameters.format)
      writeFile(idChat,currentHour,currentDate,dataRead)
    }
     
    return is_true
  }


  function writeFile(idChat,currentHour,currentDate,dataToWrite) {

const dataChat = { 
    id: idChat, 
    hour: `${currentHour}`,
    date: `${currentDate}` 
};

dataToWrite.groups.push(dataChat)
fs.writeFileSync('timerlist.json',JSON.stringify(dataToWrite,null,2));
}

module.exports.timerList = timerList;