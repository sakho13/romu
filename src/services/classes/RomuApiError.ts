import { ErrorCodes } from "@/statics/ErrorCodes"
import {
  ErrorCode,
  ErrorMessageParams,
  ErrorUnitGenerator,
  RomuApiErrorUnit,
} from "@/types/ApiTypes"
import { RomuApiErrorInterface } from "@/types/RomuInterfaces"

export class RomuApiError<E extends ErrorCode>
  extends Error
  implements RomuApiErrorInterface
{
  httpStatus: number
  private errorCode: E
  private column: string | undefined
  private errorParam: ErrorMessageParams<E>

  private err: Error | null = null

  constructor(err: ErrorUnitGenerator<E>, catchError?: Error) {
    const msg = Object.keys(err.param).reduce((p, paramKey) => {
      return p.replaceAll(
        `[${paramKey}]`,
        err.param[paramKey as keyof ErrorMessageParams<E>] as string,
      )
    }, ErrorCodes[err.errorCode].message)

    super(msg)
    this.errorCode = err.errorCode
    this.httpStatus = ErrorCodes[err.errorCode].status
    this.errorParam = "param" in err ? err.param : ({} as ErrorMessageParams<E>)
    if (err.column) this.column = err.column

    if (catchError) this.err = catchError

    if (this.errorCode === "UnknownError")
      console.log("!!UnknownError >", this.err)
  }

  public toErrorUnits() {
    return [
      {
        errorCode: this.errorCode,
        message: this.message,
      },
    ] satisfies RomuApiErrorUnit[]
  }

  public get forRomuApiErrorsProp() {
    return {
      errorCode: this.errorCode,
      column: this.column,
      message: this.message,
    } satisfies RomuApiErrorUnit
  }
}
