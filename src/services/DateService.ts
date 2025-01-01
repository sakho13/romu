import { YYYYMM, YYYYMMDD } from "@/types/DateTimeType"
import {
  startOfWeek,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  eachDayOfInterval,
  format,
} from "date-fns"

export class DateService {
  /**
   * 日付をフォーマットして返す
   * @param date
   * @returns yyyy年MM月dd日
   */
  public static convertDateToFormattedJP(date: Date) {
    return format(date, "yyyy年MM月dd日")
  }

  public static dateToYYYYMMDD(date: Date): YYYYMMDD {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    }
  }

  public static yyyymmddToDate(yyyymm: YYYYMM | YYYYMMDD): Date {
    return new Date(
      yyyymm.year,
      yyyymm.month - 1,
      "day" in yyyymm ? yyyymm.day : 1,
    )
  }

  public static shiftMonth<T extends YYYYMM | YYYYMMDD>(
    date: T,
    shift: number,
  ): T {
    if ("day" in date) {
      const newDate = new Date(date.year, date.month - 1, date.day)
      newDate.setMonth(newDate.getMonth() + shift)
      return {
        year: newDate.getFullYear(),
        month: newDate.getMonth() + 1,
        day: newDate.getDate(),
      } as T
    } else {
      const newDate = new Date(date.year, date.month - 1)
      newDate.setMonth(newDate.getMonth() + shift)
      return {
        year: newDate.getFullYear(),
        month: newDate.getMonth() + 1,
      } as T
    }
  }

  public static generateMonthDays(yyyymm: YYYYMM) {
    const start = DateService.getStartDate(yyyymm)
    const end = DateService.getEndDate(yyyymm)
    const days = eachDayOfInterval({ start, end }).map((date) =>
      Number(format(date, "d")),
    )
    const weeks: number[][] = []
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7))
    }
    return weeks
  }

  public static getStartDate(date: YYYYMMDD | YYYYMM) {
    const day = "day" in date ? date.day : 1
    return startOfWeek(startOfMonth(new Date(date.year, date.month - 1, day)), {
      weekStartsOn: 0,
    })
  }

  public static getEndDate(date: YYYYMMDD | YYYYMM) {
    const day = "day" in date ? date.day : 1
    return endOfWeek(endOfMonth(new Date(date.year, date.month - 1, day)), {
      weekStartsOn: 0,
    })
  }
}
