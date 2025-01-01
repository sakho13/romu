import { useState } from "react"

export function useCalender(initDate: Date = new Date()) {
  const [selectedDate, setSelectedDate] = useState<Date>(initDate)
  const [currentMonth, setCurrentMonth] = useState<Date>(initDate)

  function onChangeMonth(date: Date) {
    setCurrentMonth(date)
  }

  // const [selectedDate] = useState<YYYYMMDD>(
  //   DateService.dateToYYYYMMDD(initDate),
  // )
  // const [weeks, setWeeks] = useState<number[][]>([])

  // function prevMonth() {
  //   setMainMonth(DateService.shiftMonth(mainMonth, -1))
  // }

  // function nextMonth() {
  //   setMainMonth(DateService.shiftMonth(mainMonth, +1))
  // }

  // function initCalender(mainMonth: YYYYMM) {
  //   // 前後の月分も生成する
  //   // 月を移動してした場合、追加分を生成する
  //   const mainMonthDays = DateService.generateMonthDays(mainMonth)
  // }

  /**
   * 1月分の日付を生成する
   */
  // function _generateDays(yyyymm: YYYYMM) {
  //   return DateService.generateMonthDays(yyyymm)
  // }

  return {
    currentMonth,
    onChangeMonth,
    selectedDate,
    onSelectDate: setSelectedDate,
  }
}
