import { ApiV1Service } from "@/services/ApiService"
import { useAuthStore } from "@/stores/useAuthStore"
import { RomuWorkout } from "@/types/WorkoutType"
import { useEffect, useState } from "react"
import { LoadingIcon } from "../atoms/LoadingIcon"
import Link from "next/link"

type Props = {
  workoutId: string
}

export function RomuWorkoutDetail({ workoutId }: Props) {
  const { accessToken } = useAuthStore()

  const [isEditable, setIsEditable] = useState(false)
  const [workout, setWorkout] = useState<RomuWorkout | null>(null)

  useEffect(() => {
    const _fetchWorkout = async (workoutId: string) => {
      if (!accessToken) return
      const result = await ApiV1Service.getWorkout(accessToken, workoutId)
      if (result.success) {
        setWorkout(result.data.workout)
        setIsEditable(result.data.editable)
      }
    }
    _fetchWorkout(workoutId)
  }, [workoutId, accessToken])

  if (!workout) return <LoadingIcon />

  if (!workout)
    return (
      <div className='w-full'>
        <div className='my-8 chat chat-end'>
          <div className='chat-bubble chat-bubble-error font-bold select-none'>
            このワークアウトは存在しません
          </div>
        </div>

        <div className='w-full'>
          <div className='mx-auto w-fit'>
            <Link href={"/romu/workouts"} className='btn btn-warning'>
              戻る / Back
            </Link>
          </div>
        </div>
      </div>
    )

  return (
    <div id='romu-workout-detail'>
      <p>{workout.name}</p>

      <Link
        href={`https://www.youtube.com/results?search_query=${workout.name}+フォーム`}
        target='_blank'
        className='btn'
        title='YouTubeで検索します'
      >
        「{workout.name} フォーム」でYouTube検索
      </Link>

      {isEditable ? (
        <button className='btn btn-secondary'>編集 / Edit</button>
      ) : null}
    </div>
  )
}
