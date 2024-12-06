import { ApiRequest } from "@/types/ApiTypes"
import { RomuApiError } from "./classes/RomuApiError"
import { RomuApiErrors } from "./classes/RomuApiErrors"
import { RomuWorkoutType, RomuWorkoutPart } from "@/types/WorkoutType"
import { objectKeysNumber } from "./functions/objectKeysNumber"

type RomuApiValidateReturn<T> =
  | {
      data: T
      error: null
    }
  | {
      data: null
      error: RomuApiErrors
    }

export class RomuApiValidateService {
  /**
   * 複数のエラーチェックを全て実行する
   * @description エラーチェックで発生した全てのエラーをまとめて返す
   * @param checkFns エラーチェック関数の配列 (エラーが発生した場合は`RomuApiError`をthrowする)
   * @returns `RomuApiErrors | null` エラーが発生しなかった場合はnullを返す
   */
  public static checkMultipleErrors(
    checkFns: (() => void)[],
  ): RomuApiErrors | null {
    const errors = new RomuApiErrors()

    checkFns.forEach((fn) => {
      try {
        fn()
      } catch (error) {
        if (error instanceof RomuApiError) {
          errors.pushError(error.forRomuApiErrorsProp)
        } else {
          const err = new RomuApiError(
            {
              errorCode: "UnknownError",
              param: {},
            },
            error,
          )
          errors.pushError(err.forRomuApiErrorsProp)
        }
      }
    })

    return errors.isEmpty ? null : errors
  }

  public static checkRequiredParameterInObject<K extends string>(
    x: any,
    keys: { column: K; name?: string }[],
  ): RomuApiValidateReturn<{ [key in K]: any }> {
    const error = this.checkMultipleErrors(
      keys.map((key) => () => {
        this.requiredParameter(x, key.column, key.name)
      }),
    )
    return error
      ? {
          data: null,
          error,
        }
      : {
          data: x,
          error: null,
        }
  }

  /**
   * 必須パラメータがオブジェクトにあるかどうかをチェックする
   * @param x オブジェクト
   * @param key チェックするキー
   * @param columnName カラム名
   * @returns
   */
  public static requiredParameter<K extends string>(
    x: any,
    key: K,
    columnName?: string,
  ): x is { [key in K]: any } {
    if (!(key in x) || typeof x !== "object" || x === null)
      throw new RomuApiError({
        errorCode: "InvalidInputRequiredParameter",
        column: key,
        param: { column: columnName ?? key },
      })
    return true
  }

  public static isStringMoreThan<K extends string>(
    x: any,
    minLength: number,
    key: K,
    columnName?: string,
  ): x is string {
    if (!(typeof x === "string" && x.length >= minLength))
      throw new RomuApiError({
        errorCode: "InvalidInputTrimMinLength",
        column: key,
        param: { column: columnName ?? key, minLength: String(minLength) },
      })
    return true
  }

  public static isStringLessThan<K extends string>(
    x: any,
    maxLength: number,
    key: K,
    columnName?: string,
  ): x is string {
    if (!(typeof x === "string" && x.length <= maxLength))
      throw new RomuApiError({
        errorCode: "InvalidInputTrimMaxLength",
        column: key,
        param: { column: columnName ?? key, maxLength: String(maxLength) },
      })
    return true
  }

  public static isIncludedInEnum<K extends string, E extends any>(
    x: any,
    enumArray: E[],
    key: K,
    columnName?: string,
  ): x is E {
    if (!enumArray.includes(x))
      throw new RomuApiError({
        errorCode: "InvalidInputEnum",
        column: key,
        param: { column: columnName ?? key },
      })
    return true
  }

  /**
   * /api/v1/user PATCHリクエストのバリデーション
   * @param body リクエストボディ
   * @returns
   */
  public static validateUserPatchInput(
    body: any,
  ): body is ApiRequest<"User-PATCH"> {
    if (Object.keys(body).length === 0)
      throw new RomuApiError({ errorCode: "EmptyRequestBody", param: {} })

    const error = RomuApiValidateService.checkMultipleErrors([
      () => {
        if ("name" in body) {
          const name = body.name

          if (typeof name !== "string")
            throw new RomuApiError({
              errorCode: "InvalidInputType",
              column: "name",
              param: { column: "ニックネーム", type: "文字列" },
            })

          if (!(String(name).trim().length >= 1))
            throw new RomuApiError({
              errorCode: "InvalidInputTrimMinLength",
              column: "name",
              param: { column: "ニックネーム", minLength: "1" },
            })

          if (!(String(name).trim().length <= 24))
            throw new RomuApiError({
              errorCode: "InvalidInputTrimMaxLength",
              column: "name",
              param: { column: "ニックネーム", maxLength: "24" },
            })
        }
      },
    ])
    if (error) throw error
    return true
  }

  /**
   * /api/v1/workout POSTリクエストのバリデーション
   * @param body リクエストボディ
   * @returns
   */
  public static validateWorkoutPostInput(
    body: any,
  ): body is ApiRequest<"Workout-POST"> {
    const { data, error: requiredError } =
      RomuApiValidateService.checkRequiredParameterInObject(body, [
        { column: "name", name: "ワークアウト名" },
        { column: "memo", name: "メモ" },
        { column: "type", name: "種目" },
        { column: "part", name: "部位" },
      ])
    if (requiredError) throw requiredError

    const error = new RomuApiErrors()

    if (typeof data.name !== "string")
      error.pushError(
        new RomuApiError({
          errorCode: "InvalidInputType",
          column: "name",
          param: { column: "ワークアウト名", type: "文字列" },
        }),
      )
    if (typeof data.memo !== "string")
      error.pushError(
        new RomuApiError({
          errorCode: "InvalidInputType",
          column: "memo",
          param: { column: "メモ", type: "文字列" },
        }),
      )
    if (!error.isEmpty) throw error

    if (data.name.trim().length < 1)
      error.pushError(
        new RomuApiError({
          errorCode: "InvalidInputTrimMinLength",
          column: "name",
          param: { column: "ワークアウト名", minLength: "1" },
        }),
      )
    if (data.name.trim().length > 50)
      error.pushError(
        new RomuApiError({
          errorCode: "InvalidInputTrimMaxLength",
          column: "name",
          param: { column: "ワークアウト名", maxLength: "100" },
        }),
      )

    if (data.memo.trim().length > 1000)
      error.pushError(
        new RomuApiError({
          errorCode: "InvalidInputTrimMaxLength",
          column: "memo",
          param: { column: "メモ", maxLength: "1000" },
        }),
      )
    if (!objectKeysNumber(RomuWorkoutType).includes(data.type))
      error.pushError(
        new RomuApiError({
          errorCode: "InvalidInputEnum",
          column: "type",
          param: { column: "種目" },
        }),
      )
    if (!objectKeysNumber(RomuWorkoutPart).includes(data.part))
      error.pushError(
        new RomuApiError({
          errorCode: "InvalidInputEnum",
          column: "part",
          param: { column: "部位" },
        }),
      )

    if (!error.isEmpty) throw error

    return true
  }
}
