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
import { joinClassName } from "@/services/functions/joinClassName"

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
        <table id='workout-list' className='table lg:w-[600px]'>
          <thead className='select-none'>
            <tr>
              <th>種目名</th>
              <th>種類</th>
              <th>部位</th>
              <th>編集</th>
            </tr>
          </thead>

          <tbody>
            {workouts.map((workout) => (
              <tr key={workout.id}>
                <th title={workout.memo}>{workout.name}</th>
                <th>{cvRomuWorkoutTypeNameByEnum(workout.type)}</th>
                <th>{cvRomuWorkoutPartNameByEnum(workout.part)}</th>
                <th className='flex justify-center'>
                  {workout.isDefault ? (
                    <span className='select-none'>-</span>
                  ) : (
                    <Link href={`/romu/workouts/${workout.id}`}>edit</Link>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Link
        id='romu-workout-list-fab'
        className={joinClassName(
          "fixed z-50 bottom-10 right-10",
          "p-0 w-12 h-12",
          "bg-lime-600 rounded-full hover:bg-lime-700 active:shadow-lg mouse shadow",
          "transition ease-in duration-200 focus:outline-none",
          "flex items-center justify-center",
        )}
        href={"/romu/workouts/new"}
      >
        <svg
          viewBox='0 0 20 20'
          enable-background='new 0 0 20 20'
          className='w-6 h-6 inline-block'
        >
          <path
            fill='#FFFFFF'
            d='M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                    C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                    C15.952,9,16,9.447,16,10z'
          />
        </svg>
      </Link>
    </div>
  )
}
