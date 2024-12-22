import { useAuthStore } from "@/stores/useAuthStore"
import { RomuApiResponse } from "@/types/ApiTypes"
import useSWR from "swr"

export function useGetWorkouts() {
  const { accessToken } = useAuthStore()

  const { data, error, isLoading } = useSWR(
    ["/api/v1/workouts", accessToken],
    async ([url, accessToken]) =>
      apiV1Fetcher(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
  )

  return {
    getWorkoutsData: data,
    getWorkoutsError: error,
    getWorkoutsLoading: isLoading,
  }
}

const apiV1Fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json()) as Promise<
    RomuApiResponse<"Workouts-GET">["data"]
  >
