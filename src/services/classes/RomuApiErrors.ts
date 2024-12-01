import { RomuApiErrorUnit } from "@/types/ApiTypes"
import { RomuApiErrorInterface } from "@/types/RomuInterfaces"

/**
 * 複数のエラーをまとめて扱うクラス
 *
 * @class RomuApiErrors
 * @implements RomuApiErrorInterface
 * @description
 * 入力エラーなど複数のエラーをまとめて扱う際に使用する。
 * 例えば、バリデーションエラーが複数発生した場合に使用することを想定している。
 */
export class RomuApiErrors extends Error implements RomuApiErrorInterface {
  httpStatus: number

  private romuApiErrorUnits: RomuApiErrorUnit[]

  constructor(...errors: RomuApiErrorUnit[]) {
    super(`RomuApiErrors: ${errors.map((e) => e.message).join(", ")}`)

    this.romuApiErrorUnits = errors
    this.httpStatus = 400
  }

  public pushError(error: RomuApiErrorUnit) {
    this.romuApiErrorUnits.push(error)
  }

  public toErrorUnits() {
    return this.romuApiErrorUnits
  }

  public get isEmpty() {
    return this.romuApiErrorUnits.length === 0
  }
}
