import { RomuApiError } from "./classes/RomuApiError"

export class RomuApiValidateService {
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
  ) {
    if (!enumArray.includes(x))
      throw new RomuApiError({
        errorCode: "InvalidInputEnum",
        column: key,
        param: { column: columnName ?? key },
      })
    return true
  }
}
