import { RomuApiError } from "@/services/classes/RomuApiError"
import { RomuApiErrors } from "@/services/classes/RomuApiErrors"
import { RomuApiValidateService } from "@/services/RomuApiValidateService"

describe("services/RomuApiValidateService", () => {
  describe("checkMultipleErrors", () => {
    test("エラーチェック関数がエラーをスローしない場合、nullを返す", () => {
      const checkFns = [() => {}]
      expect(RomuApiValidateService.checkMultipleErrors(checkFns)).toBe(null)
    })

    test("エラーチェック関数がエラーをスローする場合、エラーを返す", () => {
      const checkFns = [
        () => {
          throw new RomuApiError({
            errorCode: "InvalidInputEnum",
            column: "type",
            param: { column: "種目" },
          })
        },
      ]
      expect(RomuApiValidateService.checkMultipleErrors(checkFns)).toEqual(
        new RomuApiErrors(
          new RomuApiError({
            errorCode: "InvalidInputEnum",
            column: "type",
            param: { column: "種目" },
          }).forRomuApiErrorsProp,
        ),
      )
    })

    test("エラーチェック関数がエラーをスローする場合、エラーを返す", () => {
      const checkFns = [
        () => {
          throw new Error()
        },
      ]
      expect(RomuApiValidateService.checkMultipleErrors(checkFns)).toEqual(
        new RomuApiErrors(
          new RomuApiError({
            errorCode: "UnknownError",
            param: {},
          }).forRomuApiErrorsProp,
        ),
      )
    })
  })

  describe("checkRequiredParameterInObject", () => {
    test("指定したキーがオブジェクトに存在する場合、エラーを返さない", () => {
      const obj = { key: "value" }
      const keys = [{ column: "key" }]
      expect(
        RomuApiValidateService.checkRequiredParameterInObject(obj, keys).error,
      ).toBeNull()
    })

    test("指定したキーがオブジェクトに存在しない場合、エラーを返す", () => {
      const obj = { key: "value" }
      const keys = [{ column: "notKey", name: "name" }]
      expect(
        RomuApiValidateService.checkRequiredParameterInObject(obj, keys).error,
      ).toEqual(
        new RomuApiErrors(
          new RomuApiError({
            errorCode: "InvalidInputRequiredParameter",
            column: "notKey",
            param: { column: "name" },
          }).forRomuApiErrorsProp,
        ),
      )
    })

    test("空のオブジェクトの場合、エラーを返す", () => {
      const obj = {}
      const keys = [{ column: "key" }]
      expect(
        RomuApiValidateService.checkRequiredParameterInObject(obj, keys).error,
      ).toEqual(
        new RomuApiErrors(
          new RomuApiError({
            errorCode: "InvalidInputRequiredParameter",
            column: "key",
            param: { column: "key" },
          }).forRomuApiErrorsProp,
        ),
      )
    })
  })

  describe("requiredParameter", () => {
    test("指定したキーがオブジェクトに存在する場合、trueを返す", () => {
      const obj = { key: "value" }
      expect(RomuApiValidateService.requiredParameter(obj, "key")).toBe(true)
    })

    test("指定したキーがオブジェクトに存在しない場合、エラーをスローする", () => {
      const obj = { key: "value" }
      expect(() =>
        RomuApiValidateService.requiredParameter(obj, "notKey"),
      ).toThrow()
    })

    test("値がオブジェクトでない場合、エラーをスローする", () => {
      const obj = "string"
      expect(() =>
        RomuApiValidateService.requiredParameter(obj, "key"),
      ).toThrow()
    })

    test("値がnullの場合、エラーをスローする", () => {
      const obj = null
      expect(() =>
        RomuApiValidateService.requiredParameter(obj, "key"),
      ).toThrow()
    })

    test("カラム名が指定されている場合、エラーをスローする", () => {
      const obj = { key: "value" }
      expect(() =>
        RomuApiValidateService.requiredParameter(obj, "notKey", "column"),
      ).toThrow(
        new RomuApiError({
          errorCode: "InvalidInputRequiredParameter",
          column: "notKey",
          param: { column: "column" },
        }),
      )
    })
  })

  describe("isStringMoreThan", () => {
    test("指定した文字列が指定した文字数以上の場合、trueを返す", () => {
      const str = "string"
      expect(RomuApiValidateService.isStringMoreThan(str, 5, "str")).toBe(true)
    })

    test("指定した文字列が指定した文字数未満の場合、エラーをスローする", () => {
      const str = "string"
      expect(() =>
        RomuApiValidateService.isStringMoreThan(str, 10, "str"),
      ).toThrow()
    })

    test("指定した値が文字列でない場合、エラーをスローする", () => {
      const str = 123
      expect(() =>
        RomuApiValidateService.isStringMoreThan(str, 5, "str"),
      ).toThrow()
    })
  })

  describe("isStringLessThan", () => {
    test("指定した文字列が指定した文字数以下の場合、trueを返す", () => {
      const str = "string"
      expect(RomuApiValidateService.isStringLessThan(str, 10, "str")).toBe(true)
    })

    test("指定した文字列が指定した文字数を超える場合、エラーをスローする", () => {
      const str = "string"
      expect(() =>
        RomuApiValidateService.isStringLessThan(str, 5, "str"),
      ).toThrow()
    })

    test("指定した値が文字列でない場合、エラーをスローする", () => {
      const str = 123
      expect(() =>
        RomuApiValidateService.isStringLessThan(str, 10, "str"),
      ).toThrow()
    })
  })

  describe("isIncludedInEnum", () => {
    test("指定した値が指定した列挙型に含まれる場合、trueを返す", () => {
      const enumArray = ["a", "b", "c"]
      const x = "a"
      expect(RomuApiValidateService.isIncludedInEnum(x, enumArray, "str")).toBe(
        true,
      )
    })

    test("指定した値が指定した列挙型に含まれない場合、エラーをスローする", () => {
      const enumArray = ["a", "b", "c"]
      const x = "d"
      expect(() =>
        RomuApiValidateService.isIncludedInEnum(x, enumArray, "str"),
      ).toThrow()
    })

    test("指定した値が文字列でない場合、エラーをスローする", () => {
      const enumArray = ["a", "b", "c"]
      const x = 123
      expect(() =>
        RomuApiValidateService.isIncludedInEnum(x, enumArray, "str"),
      ).toThrow()
    })

    test("カラム名が指定されている場合、エラーをスローする", () => {
      const enumArray = ["a", "b", "c"]
      const x = "d"
      expect(() =>
        RomuApiValidateService.isIncludedInEnum(x, enumArray, "str", "column"),
      ).toThrow()
    })

    test("カラム名が指定されている場合、エラーをスローする", () => {
      const enumArray = ["a", "b", "c"]
      const x = "d"
      expect(() =>
        RomuApiValidateService.isIncludedInEnum(x, enumArray, "str", "column"),
      ).toThrow(
        new RomuApiError({
          errorCode: "InvalidInputEnum",
          column: "str",
          param: { column: "column" },
        }),
      )
    })
  })

  describe("ApiValidator", () => {
    describe("validateWorkoutPostInput", () => {
      test("正常なリクエストボディの場合、trueを返す", () => {
        expect(
          RomuApiValidateService.validateWorkoutPostInput({
            name: "name",
            memo: "memo",
            type: 1,
            part: 1,
          }),
        ).toBe(true)
      })

      test("空のボディの場合、必須項目エラー", () => {
        expect(() =>
          RomuApiValidateService.validateWorkoutPostInput({}),
        ).toThrow(
          new RomuApiErrors(
            new RomuApiError({
              errorCode: "InvalidInputRequiredParameter",
              column: "name",
              param: { column: "ワークアウト名" },
            }).forRomuApiErrorsProp,
            new RomuApiError({
              errorCode: "InvalidInputRequiredParameter",
              column: "memo",
              param: { column: "メモ" },
            }).forRomuApiErrorsProp,
            new RomuApiError({
              errorCode: "InvalidInputRequiredParameter",
              column: "type",
              param: { column: "種目" },
            }).forRomuApiErrorsProp,
            new RomuApiError({
              errorCode: "InvalidInputRequiredParameter",
              column: "part",
              param: { column: "部位" },
            }).forRomuApiErrorsProp,
          ),
        )
      })

      test("nameが文字列でない場合、エラーをスローする", () => {
        const body = {
          name: 1,
          type: 1,
          part: 1,
          memo: "memo",
        }
        expect(() =>
          RomuApiValidateService.validateWorkoutPostInput(body),
        ).toThrow(
          new RomuApiErrors(
            new RomuApiError({
              errorCode: "InvalidInputType",
              column: "name",
              param: { column: "ワークアウト名", type: "文字列" },
            }).forRomuApiErrorsProp,
          ),
        )
      })

      test("nameが空文字の場合、エラーをスローする", () => {
        const body = {
          name: "",
          type: 1,
          part: 1,
          memo: "memo",
        }
        expect(() =>
          RomuApiValidateService.validateWorkoutPostInput(body),
        ).toThrow(
          new RomuApiErrors(
            new RomuApiError({
              errorCode: "InvalidInputTrimMinLength",
              column: "name",
              param: { column: "ワークアウト名", minLength: "1" },
            }).forRomuApiErrorsProp,
          ),
        )
      })

      test("nameが50文字を超える場合、エラーをスローする", () => {
        const body = {
          name: "a".repeat(51),
          type: 1,
          part: 1,
          memo: "memo",
        }
        expect(() =>
          RomuApiValidateService.validateWorkoutPostInput(body),
        ).toThrow(
          new RomuApiErrors(
            new RomuApiError({
              errorCode: "InvalidInputTrimMaxLength",
              column: "name",
              param: { column: "ワークアウト名", maxLength: "50" },
            }).forRomuApiErrorsProp,
          ),
        )
      })

      test("memoが文字列でない場合、エラーをスローする", () => {
        const body = {
          name: "name",
          type: 1,
          part: 1,
          memo: 1,
        }
        expect(() =>
          RomuApiValidateService.validateWorkoutPostInput(body),
        ).toThrow(
          new RomuApiErrors(
            new RomuApiError({
              errorCode: "InvalidInputType",
              column: "memo",
              param: { column: "メモ", type: "文字列" },
            }).forRomuApiErrorsProp,
          ),
        )
      })

      test("memoが1000文字を超える場合、エラーをスローする", () => {
        const body = {
          name: "name",
          type: 1,
          part: 1,
          memo: "a".repeat(1001),
        }
        expect(() =>
          RomuApiValidateService.validateWorkoutPostInput(body),
        ).toThrow(
          new RomuApiErrors(
            new RomuApiError({
              errorCode: "InvalidInputTrimMaxLength",
              column: "memo",
              param: { column: "メモ", maxLength: "1000" },
            }).forRomuApiErrorsProp,
          ),
        )
      })

      test("typeが数値でない場合、エラーをスローする", () => {
        const body = {
          name: "name",
          type: "type",
          part: 1,
          memo: "memo",
        }
        expect(() =>
          RomuApiValidateService.validateWorkoutPostInput(body),
        ).toThrow(
          new RomuApiErrors(
            new RomuApiError({
              errorCode: "InvalidInputType",
              column: "type",
              param: { column: "種目", type: "数値" },
            }).forRomuApiErrorsProp,
          ),
        )
      })

      test("typeが区分値外の場合、エラーをスローする", () => {
        const body = {
          name: "name",
          type: 100,
          part: 1,
          memo: "memo",
        }
        expect(() =>
          RomuApiValidateService.validateWorkoutPostInput(body),
        ).toThrow(
          new RomuApiErrors(
            new RomuApiError({
              errorCode: "InvalidInputEnum",
              column: "type",
              param: { column: "種目" },
            }).forRomuApiErrorsProp,
          ),
        )
      })

      test("partが数値でない場合、エラーをスローする", () => {
        const body = {
          name: "name",
          type: 1,
          part: "part",
          memo: "memo",
        }
        expect(() =>
          RomuApiValidateService.validateWorkoutPostInput(body),
        ).toThrow(
          new RomuApiErrors(
            new RomuApiError({
              errorCode: "InvalidInputType",
              column: "part",
              param: { column: "部位", type: "数値" },
            }).forRomuApiErrorsProp,
          ),
        )
      })

      test("partが区分値外の場合、エラーをスローする", () => {
        const body = {
          name: "name",
          type: 1,
          part: 100,
          memo: "memo",
        }
        expect(() =>
          RomuApiValidateService.validateWorkoutPostInput(body),
        ).toThrow(
          new RomuApiErrors(
            new RomuApiError({
              errorCode: "InvalidInputEnum",
              column: "part",
              param: { column: "部位" },
            }).forRomuApiErrorsProp,
          ),
        )
      })
    })
  })
})
