module.exports = function getDay(locale){

  const getDate = new Date()
  const day = getDate.getDate()
  const month = getDate.getMonth()+1
  const year = getDate.getFullYear()

  const dayWeek = `${month}/${day}/${year}`
  const newDate = new Date(dayWeek)
  return newDate.toLocaleDateString(locale, { weekday: 'long' })
}