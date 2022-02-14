class CalendarLogic{
  static getMonthDaysAmount(date: number): number{
    const [month, year] = [new Date(date).getUTCMonth(), new Date(date).getUTCFullYear()]
    let days = [31,28,31,30,31,30,31,31,30,31,30,31]

    if ((year % 4 === 0 && year % 100 !== 0 ) || (year % 400 === 0)) days[1] = 29
    return days[month]
  }

  static getPreviousMonth(timestamp: number): number {
    const date = new Date(timestamp)
    const month = date.getUTCMonth()

    if(month > 0) return date.setUTCMonth(month - 1)
    return new Date(date.setUTCFullYear(date.getUTCFullYear() - 1)).setUTCMonth(11)
  }

  static getNextMonth(timestamp: number): number{
    const date = new Date(timestamp)
    const month = date.getUTCMonth()

    if(month < 11) return date.setUTCMonth(month + 1)
    return new Date(date.setUTCFullYear(date.getUTCFullYear() + 1)).setUTCMonth(0)
  }

  static setDay(timestamp: number, day: number): number{
    const date = new Date(timestamp)
    const daysInMonth = CalendarLogic.getMonthDaysAmount(date.getUTCMonth())

    if(day > daysInMonth || daysInMonth < 1) throw new Error('Month dosn\'t have that days amount')
    return date.setUTCDate(day)
  }

  static getWeekdayIndex(timestamp: number){
    return new Date(timestamp).getUTCDay()
  }
}

export default CalendarLogic