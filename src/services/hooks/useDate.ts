import { YYYYMMDD } from "@/types/DateTimeType"
import { startOfWeek, startOfMonth, endOfWeek, endOfMonth, add } from "date-fns"
import { useState } from "react"

export function useDate() {
  const [date, setDate] = useState<YYYYMMDD>({
    year: 2000,
    month: 1,
    day: 1,
  })

  function initDate(date: Date = new Date()) {
    setDate({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    })
  }

  function formatDate(...separator: string[]) {
    if (separator.length === 0) return `${date.year}${date.month}${date.day}`
    if (separator.length === 1)
      return `${date.year}${separator[0]}${date.month}${separator[0]}${date.day}`
    if (separator.length === 2)
      return `${date.year}${separator[0]}${date.month}${separator[1]}${date.day}`
    if (separator.length === 3)
      return `${date.year}${separator[0]}${date.month}${separator[1]}${date.day}${separator[2]}`
  }

  function shiftDate(shift: { y?: number; m?: number; d?: number }) {
    const result = add(new Date(date.year, date.month - 1, date.day), {
      years: shift.y,
      months: shift.m,
      days: shift.d,
    })
    initDate(result)
  }

  function getStartDate() {
    return startOfWeek(
      startOfMonth(new Date(date.year, date.month - 1, date.day)),
      {
        weekStartsOn: 0,
      },
    )
  }

  function getEndDate() {
    return endOfWeek(
      endOfMonth(new Date(date.year, date.month - 1, date.day)),
      {
        weekStartsOn: 0,
      },
    )
  }

  return {
    date,
    initDate,
    shiftDate,
    formatDate,
    getStartDate,
    getEndDate,
  }
}
