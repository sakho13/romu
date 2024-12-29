import { apiV1Fetcher } from "@/services/functions/apiV1Fetcher"
import { useAuthStore } from "@/stores/useAuthStore"
import useSWR from "swr"

export function useGetWorkouts() {
  const { accessToken } = useAuthStore()

  const { data, error, isLoading } = useSWR(
    ["/api/v1/workouts", accessToken],
    async ([url, accessToken]) =>
      apiV1Fetcher("Workouts-GET", url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
  )

  return {
    dataGetWorkouts: data,
    errorGetWorkouts: error,
    isLoadingGetWorkouts: isLoading,
  }
}
