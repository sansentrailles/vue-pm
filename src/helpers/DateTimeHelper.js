export default class {
  static DateToTimestamp(date) {
    return Date.parse(date)
  }

  static formatted(date) {
    const [year, month, day] = date.split('-')
    return day+'.'+month+'.'+year
  }

  static timestampToRawDate(timestamp)
  {
    // eslint-disable-next-line no-console
    console.log(timestamp)
    const millis = timestamp * 1000
    const date = new Date(millis)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    const monthLabel = month < 10 ? '0' + month : month
    const dayLabel = day < 10 ? '0' + day : day

    return `${year}-${monthLabel}-${dayLabel}`
  }
}
