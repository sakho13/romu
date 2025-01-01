import { useState } from "react"

export function useCalender(initDate: Date = new Date()) {
  const [selectedDate, setSelectedDate] = useState<Date>(initDate)
  const [currentMonth, setCurrentMonth] = useState<Date>(initDate)

  function onChangeMonth(date: Date) {
    setCurrentMonth(date)
  }

  return {
    currentMonth,
    onChangeMonth,
    selectedDate,
    onSelectDate: setSelectedDate,
  }
}
