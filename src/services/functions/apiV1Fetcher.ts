import { ApiResponseSelector, RomuApiResponse } from "@/types/ApiTypes"

export const apiV1Fetcher = <S extends ApiResponseSelector>(
  _selector: S,
  ...args: Parameters<typeof fetch>
) =>
  fetch(...args).then((res) => {
    if (!res.ok) return res.json()
    return res.json()
  }) as Promise<RomuApiResponse<S>["data"]>
