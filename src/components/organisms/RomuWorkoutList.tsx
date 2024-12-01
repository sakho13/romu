"use client"
import { ApiV1Service } from "@/services/ApiService"
import {
  cvRomuWorkoutPartNameByEnum,
  cvRomuWorkoutTypeNameByEnum,
} from "@/services/functions/convertValue"
import { useLoading } from "@/services/hooks/useLoading"
import { useAuthStore } from "@/stores/useAuthStore"
import { RomuWorkout } from "@/types/WorkoutType"
import { useEffect, useState } from "react"
import { LoadingIcon } from "../atoms/LoadingIcon"
import Link from "next/link"

export function RomuWorkoutList() {
  const { accessToken } = useAuthStore()
  const [workouts, setWorkouts] = useState<RomuWorkout[]>([])
  const loading = useLoading(false)

  const _fetchWorkouts = async () => {
    if (loading.loading) return
    loading.startLoading()

    if (!accessToken) {
      loading.stopLoading()
      return
    }

    try {
      const result = await ApiV1Service.getWorkouts(accessToken)
      if (result.success) setWorkouts(result.data.workouts)
    } catch (error) {
    } finally {
      loading.stopLoading()
    }
  }

  useEffect(() => {
    _fetchWorkouts()
  }, [])

  return (
    <div id='romu-workout-list'>
      <div id='workout-search my-4'></div>

      {loading.loading ? (
        <LoadingIcon />
      ) : (
        <table id='workout-list' className='table'>
          <thead className='select-none'>
            <tr>
              <th>種目名</th>
              <th>種類</th>
              <th>部位</th>
            </tr>
          </thead>

          <tbody>
            {workouts.map((workout) => (
              <tr key={workout.id}>
                <th title={workout.memo}>{workout.name}</th>
                <th>{cvRomuWorkoutTypeNameByEnum(workout.type)}</th>
                <th>{cvRomuWorkoutPartNameByEnum(workout.part)}</th>
                <th>
                  {workout.isDefault ? (
                    ""
                  ) : (
                    <Link href={`/romu/workouts/${workout.id}`}>edit</Link>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
