function getParameters(match){
  console.log(match)
  const matchSplit = match[1].split(',')
  const dataMatch = {
    year: parseInt(matchSplit[0]),
    season: matchSplit[1].toUpperCase(),
    format: matchSplit[2].toUpperCase(),
  }

  return dataMatch
}

module.exports.getParameters = getParameters;