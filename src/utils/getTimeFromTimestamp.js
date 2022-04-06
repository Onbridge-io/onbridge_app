function getStringMonth(month) {
  switch (month) {
    case 1:
      return 'JAN'
    case 2:
      return 'FEB'
    case 3:
      return 'MAR'
    case 4:
      return 'APR'
    case 5:
      return 'MAY'
    case 6:
      return 'JUN'
    case 7:
      return 'JUL'
    case 8:
      return 'AUG'
    case 9:
      return 'SEP'
    case 10:
      return 'OCT'
    case 11:
      return 'NOV'
    case 12:
      return 'DEC'
    default:
      return ''
  }
}

export function getTimeFromTimeStamp(datetimeStamp) {
  const date = new Date(datetimeStamp * 1000)
  let minutes = date.getUTCMinutes()
  let hours = date.getUTCHours()
  const month = date.getUTCMonth() + 1
  const days = date.getUTCDate()

  if (Number(minutes) < 10) {
    minutes = '0' + minutes
  }
  if (Number(hours) < 10) {
    hours = '0' + hours
  }

  const formattedTime =
    days +
    ' ' +
    getStringMonth(month) +
    ' ' +
    date.getUTCFullYear() +
    ' ' +
    hours +
    ':' +
    minutes

  return formattedTime
}
