import {
  ApiPath,
  ApiRequest,
  ApiResponse,
  ApiResponseSelector,
  RomuApiResponse,
} from "@/types/ApiTypes"
import { exponentialBackoff } from "./functions/exponentialBackoff"

export class ApiV1Service {
  public static async postUser(accessToken: string) {
    return await exponentialBackoff(
      async () => await requestApiV1("User-POST", {}, accessToken),
    )
  }

  public static async getUser(accessToken: string) {
    return await requestApiV1("User-GET", {}, accessToken)
  }
}

async function requestApiV1<S extends ApiResponseSelector>(
  selector: S,
  input: ApiRequest<S>,
  accessToken?: string,
) {
  const method = selector.split("-")[1]
  const path = ApiPath[selector]
  const body = method === "GET" ? undefined : JSON.stringify(input)

  const result = await fetch(path, {
    method,
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
    body,
  })
  console.log("result", result)
  return (await result.json()) as RomuApiResponse<S>["data"]
}
