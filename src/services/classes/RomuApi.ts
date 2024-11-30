import { RomuApiError } from "./RomuApiError"
import { NextApiRequest } from "next"
import {
  ApiResponseSelector,
  ApiResponse,
  RomuApiResponse,
  ApiRequest,
} from "@/types/ApiTypes"
import { verifyIdToken } from "@/utils/firebaseAdmin"

export class RomuApi<P extends ApiResponseSelector> {
  private apiSelector: P

  constructor(apiSelector: P, req: NextApiRequest) {
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
      if (error instanceof RomuApiError) {
        return {
          status: error.HttpStatus,
          data: {
            success: false,
            errors: [error.toErrorUnit()],
          },
        }
      } else {
        const err = new RomuApiError(
          {
            errorCode: "UnknownError",
            param: {},
          },
          error,
        )
        return {
          status: 400,
          data: {
            success: false,
            errors: [err.toErrorUnit()],
          },
        }
      }
    }
  }

  public async verifyAuthorizationHeader(
    authorization: string | null | undefined,
  ) {
    if (!authorization || !authorization.startsWith("Bearer "))
      throw new RomuApiError({ errorCode: "AuthFailed", param: {} })

    const accessToken = authorization.split(" ")[1]

    try {
      return await verifyIdToken(accessToken)
    } catch (error) {
      throw new RomuApiError({ errorCode: "AuthFailed", param: {} }, error)
    }
  }
}
