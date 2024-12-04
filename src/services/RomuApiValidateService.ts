import { RomuApiError } from "./classes/RomuApiError"
import { RomuApiErrors } from "./classes/RomuApiErrors"

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
}
