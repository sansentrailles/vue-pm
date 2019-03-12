export default class {
  static DateToTimestamp(date) {
    return Date.parse(date)
  }

  static formatted(date) {
    const [year, month, day] = date.split('-')
    return day+'.'+month+'.'+year
  }
}