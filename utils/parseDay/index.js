function parseDay(animeDay){
  const dayLower = animeDay.toLowerCase();

  switch(dayLower){
    case 'segunda': return 'monday'
    case 'segunda-feira': return 'monday'

    case 'terça': return 'tuesday'
    case 'terça-feira': return 'tuesday'

    case 'quarta': return 'wednesday'
    case 'quarta-feira': return 'wednesday'

    case 'quinta': return 'thursday'
    case 'quinta-feira': return 'thursday'

    case 'sexta': return 'friday'
    case 'sexta-feira': return 'friday'

    case 'sabado': return 'saturday'
    case 'sábado': return 'saturday'

    case 'domingo': return 'sunday'
    case 'domingo': return 'sunday'
  }
}

module.exports.parseDay = parseDay;