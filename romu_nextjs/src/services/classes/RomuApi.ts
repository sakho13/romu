import { RomuApiError } from "./RomuApiError"
import {
  ApiResponseSelector,
  ApiResponse,
  RomuApiResponse,
} from "@/types/ApiTypes"
import { verifyIdToken } from "@/utils/firebaseAdmin"
import { RomuApiErrors } from "./RomuApiErrors"
import { PrismaClientInitializationError } from "@prisma/client/runtime/library"

export class RomuApi<P extends ApiResponseSelector> {
  private apiSelector: P

  constructor(apiSelector: P) {
    this.apiSelector = apiSelector
  }

  public async execute(
    mainLogic: () => Promise<ApiResponse<P>> | ApiResponse<P>,
  ): Promise<RomuApiResponse<P>> {
    try {
      const result = await mainLogic()
      return {
        status: 200,
        data: {
          success: true,
          data: result,
        },
      }
    } catch (error) {
      if (error instanceof PrismaClientInitializationError) {
        const dbError = new RomuApiError(
          { errorCode: "DbConnectionFailed", param: {} },
          error,
        )
        return {
          status: dbError.httpStatus,
          data: {
            success: false,
            errors: dbError.toErrorUnits(),
          },
        }
      }
      if (error instanceof RomuApiError) {
        return {
          status: error.httpStatus,
          data: {
            success: false,
            errors: error.toErrorUnits(),
          },
        }
      }
      if (error instanceof RomuApiErrors && !error.isEmpty) {
        return {
          status: error.httpStatus,
          data: {
            success: false,
            errors: error.toErrorUnits(),
          },
        }
      } else {
        const err = new RomuApiError(
          {
            errorCode: "UnknownError",
            param: {},
          },
          error instanceof Error ? error : undefined,
        )
        return {
          status: 400,
          data: {
            success: false,
            errors: err.toErrorUnits(),
          },
        }
      }
    }
  }

  public async verifyAuthorizationHeader(
    authorization: string | null | undefined,
  ) {
    if (
      !authorization ||
      typeof authorization !== "string" ||
      !authorization.startsWith("Bearer ")
    )
      throw new RomuApiError({ errorCode: "AuthFailed", param: {} })

    const accessToken = authorization.split(" ")[1]

    if (accessToken === undefined || accessToken === "")
      throw new RomuApiError({ errorCode: "AuthFailed", param: {} })

    try {
      return await this.verifyFirebaseIdToken(accessToken)
    } catch (error) {
      throw new RomuApiError(
        { errorCode: "AuthFailed", param: {} },
        error instanceof Error ? error : undefined,
      )
    }
  }

  /**
   * リクエストURLからクエリパラメータを取得する
   * @param reqUrl リクエストURL
   * @param key 取得対象のキー
   * @returns 空文字列・パラメータが存在しないの場合はnullを返す
   */
  public getQueryParameter(reqUrl: string, key: string) {
    const { searchParams } = new URL(reqUrl)
    const param = searchParams.get(key)
    return param && param !== "" ? param : null
  }

  /**
   * FirebaseのIDトークンを検証する
   * @param token FirebaseのIDトークン
   * @returns
   */
  private async verifyFirebaseIdToken(token: string) {
    return await verifyIdToken(token)
  }
}
