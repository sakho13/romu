import {
  ApiPath,
  ApiRequest,
  ApiResponse,
  ApiResponseSelector,
  RomuApiResponse,
} from "@/types/ApiTypes"
import { exponentialBackoff } from "./functions/exponentialBackoff"
import { cvObjectToQueryParamString } from "./functions/convertValue"

export class ApiV1Service {
  public static async getUser(accessToken: string) {
    return await requestApiV1("User-GET", {}, accessToken)
  }

  public static async postUser(accessToken: string) {
    return await exponentialBackoff(
      async () => await requestApiV1("User-POST", {}, accessToken),
    )
  }

  public static async patchUser(
    accessToken: string,
    editData: ApiRequest<"User-PATCH">,
  ) {
    return await exponentialBackoff(
      async () => await requestApiV1("User-PATCH", editData, accessToken),
    )
  }

  public static async getWorkouts(accessToken: string) {
    return await requestApiV1("Workouts-GET", {}, accessToken)
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
  const requestPath =
    method === "GET" ? path + `?${cvObjectToQueryParamString(input)}` : path

  const result = await fetch(requestPath, {
    method,
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
    body,
  })
  console.log("result", result)
  return (await result.json()) as RomuApiResponse<S>["data"]
}
