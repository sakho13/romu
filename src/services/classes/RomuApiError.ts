import {
  ErrorCode,
  ErrorCodes,
  ErrorMessageParams,
  ErrorUnitGenerator,
  RomuApiErrorUnit,
} from "@/types/ApiTypes"

export class RomuApiError<E extends ErrorCode> extends Error {
  private errorCode: E
  private httpStatus: number
  private errorParam: ErrorMessageParams<E>

  private err: Error | null = null

  constructor(err: ErrorUnitGenerator<E>, catchError?: any) {
    const msg = ErrorCodes[err.errorCode].message
    if ("param" in err)
      Object.entries(err.param).forEach(([param, value]) => {
        msg.replaceAll(`[${param}]`, value)
      })

    super(msg)
    this.errorCode = err.errorCode
    this.httpStatus = ErrorCodes[err.errorCode].status
    this.errorParam = "param" in err ? err.param : ({} as ErrorMessageParams<E>)

    if (catchError) this.err = catchError

    if (this.errorCode === "UnknownError")
      console.log("!!UnknownError >", this.err)
  }

  public toErrorUnit() {
    return {
      errorCode: this.errorCode,
      message: this.message,
    } satisfies RomuApiErrorUnit
  }

  public get HttpStatus() {
    return this.httpStatus
  }
}
