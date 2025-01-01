import { DateService } from "@/services/DateService"

describe("services/DateService", () => {
  describe("convertDateToFormattedJP", () => {
    test("Date型の日付を日本語フォーマットに変換する", () => {
      expect(DateService.convertDateToFormattedJP(new Date(2022, 1, 1))).toBe(
        "2022年02月01日",
      )
      expect(DateService.convertDateToFormattedJP(new Date(2022, 1, 28))).toBe(
        "2022年02月28日",
      )
      expect(DateService.convertDateToFormattedJP(new Date(2022, 0, 1))).toBe(
        "2022年01月01日",
      )
    })
  })

  describe("dateToYYYYMMDD", () => {
    test("Date型の日付をYYYYMMDD型に変換する", () => {
      expect(DateService.dateToYYYYMMDD(new Date(2022, 1, 1))).toEqual({
        year: 2022,
        month: 2,
        day: 1,
      })
      expect(DateService.dateToYYYYMMDD(new Date(2022, 1, 28))).toEqual({
        year: 2022,
        month: 2,
        day: 28,
      })
      expect(DateService.dateToYYYYMMDD(new Date(2022, 0, 1))).toEqual({
        year: 2022,
        month: 1,
        day: 1,
      })
    })
  })

  describe("yyyymmddToDate", () => {
    test("YYYYMMDD型の日付をDate型に変換する", () => {
      expect(
        DateService.yyyymmddToDate({ year: 2022, month: 2, day: 1 }),
      ).toEqual(new Date(2022, 1, 1))
      expect(
        DateService.yyyymmddToDate({ year: 2022, month: 2, day: 28 }),
      ).toEqual(new Date(2022, 1, 28))
      expect(
        DateService.yyyymmddToDate({ year: 2022, month: 1, day: 1 }),
      ).toEqual(new Date(2022, 0, 1))
    })
  })

  describe("shiftMonth", () => {
    test("月を指定した数だけ移動する", () => {
      expect(DateService.shiftMonth({ year: 2022, month: 1 }, 1)).toEqual({
        year: 2022,
        month: 2,
      })
      expect(DateService.shiftMonth({ year: 2022, month: 1 }, 2)).toEqual({
        year: 2022,
        month: 3,
      })
      expect(DateService.shiftMonth({ year: 2022, month: 1 }, -1)).toEqual({
        year: 2021,
        month: 12,
      })
      expect(DateService.shiftMonth({ year: 2022, month: 1 }, -2)).toEqual({
        year: 2021,
        month: 11,
      })
      expect(
        DateService.shiftMonth({ year: 2022, month: 12, day: 20 }, 1),
      ).toEqual({
        year: 2023,
        month: 1,
        day: 20,
      })
      expect(
        DateService.shiftMonth({ year: 2022, month: 12, day: 20 }, 2),
      ).toEqual({
        year: 2023,
        month: 2,
        day: 20,
      })
      expect(
        DateService.shiftMonth({ year: 2022, month: 12, day: 20 }, -1),
      ).toEqual({
        year: 2022,
        month: 11,
        day: 20,
      })
      expect(
        DateService.shiftMonth({ year: 2022, month: 12, day: 20 }, -2),
      ).toEqual({
        year: 2022,
        month: 10,
        day: 20,
      })
    })
  })

  describe("getStartDate", () => {
    test("月の初日週の日曜の日付を取得する", () => {
      expect(
        DateService.dateToYYYYMMDD(
          DateService.getStartDate({ year: 2024, month: 11 }),
        ),
      ).toStrictEqual({ year: 2024, month: 10, day: 27 })
    })
  })

  describe("getEndDate", () => {
    test("月の最終日週の土曜の日付を取得する", () => {
      expect(
        DateService.dateToYYYYMMDD(
          DateService.getEndDate({ year: 2024, month: 11 }),
        ),
      ).toStrictEqual({ year: 2024, month: 11, day: 30 })
    })
  })
})
