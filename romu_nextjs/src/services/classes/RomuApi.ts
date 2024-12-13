import { RomuApiError } from "./RomuApiError"
import {
  ApiResponseSelector,
  ApiResponse,
  RomuApiResponse,
} from "@/types/ApiTypes"
import { verifyIdToken } from "@/utils/firebaseAdmin"
import { RomuApiErrors } from "./RomuApiErrors"
import { PrismaClientInitializationError } from "@prisma/client/runtime/library"
import { UserService } from "../UserService"
import { prisma } from "@/utils/prisma"

interface AuthorizationHeaderDecoded {
  uid: string
  email: string
  name: string
}

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
  ): Promise<AuthorizationHeaderDecoded> {
    if (!authorization || typeof authorization !== "string")
      throw new RomuApiError({ errorCode: "AuthFailed", param: {} })

    const adminVerifyToken = process.env.ADMIN_VERIFY_TOKEN
    if (adminVerifyToken) {
      const maybeAdminToken = authorization.startsWith(
        `RomuAdminBearer ${adminVerifyToken}`,
      )
      if (maybeAdminToken) {
        const id = authorization.replace(
          `RomuAdminBearer ${adminVerifyToken}`,
          "",
        )
        const adminUser = await UserService.getUserByFirebaseUidAdminRole(
          prisma,
          id,
        )
        if (adminUser)
          return {
            uid: adminUser.firebaseUid,
            email: adminUser.email ?? "",
            name: adminUser.name ?? "",
          }
      }
    }

    if (!authorization.startsWith("Bearer "))
      throw new RomuApiError({ errorCode: "AuthFailed", param: {} })

    const accessToken = authorization.split(" ")[1]

    if (accessToken === undefined || accessToken === "")
      throw new RomuApiError({ errorCode: "AuthFailed", param: {} })

    try {
      const decoded = await this.verifyFirebaseIdToken(accessToken)
      return {
        uid: decoded.uid,
        email: decoded.email ?? "",
        name: decoded.name ?? "",
      }
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
