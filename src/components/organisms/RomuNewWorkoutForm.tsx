"use client"
import { ApiV1Service } from "@/services/ApiService"
import {
  cvRomuWorkoutPartByInt,
  cvRomuWorkoutPartNameByEnum,
  cvRomuWorkoutTypeByInt,
  cvRomuWorkoutTypeNameByEnum,
} from "@/services/functions/convertValue"
import { useLoading } from "@/services/hooks/useLoading"
import { useAuthStore } from "@/stores/useAuthStore"
import {
  RomuWorkoutPart,
  RomuWorkoutPartEnum,
  RomuWorkoutType,
  RomuWorkoutTypeEnum,
} from "@/types/WorkoutType"
import { useState } from "react"

type NewWorkout = {
  name: string
  memo: string
  type: RomuWorkoutTypeEnum
  part: RomuWorkoutPartEnum
}

export function RomuNewWorkoutForm() {
  const { accessToken } = useAuthStore()
  const loading = useLoading(false)
  const [newWorkout, setNewWorkout] = useState<NewWorkout>({
    name: "",
    memo: "",
    type: 1,
    part: 0,
  })

  const _resetNewWorkout = () => {
    setNewWorkout({
      name: "",
      memo: "",
      type: 1,
      part: 0,
    })
  }

  const _postWorkout = async () => {
    if (loading.loading) return
    loading.startLoading()

    if (!accessToken) {
      loading.stopLoading()
      return
    }

    try {
      const result = await ApiV1Service.postWorkout(accessToken, newWorkout)
      if (result.success) {
        _resetNewWorkout()
        return
      }

      if (result.errors) {
        console.error(result.errors)
      }
    } finally {
      loading.stopLoading()
    }
  }

  return (
    <form
      id='new-workout-form'
      className='lg:w-[300px] lg:m-0 w-full mx-8'
      action={_postWorkout}
    >
      <label className='form-control w-full'>
        <div className='label'>
          <span className='label-text'>
            Workout Name<span className='font-thin'> *</span>
          </span>
        </div>
        <input
          type='text'
          className='input input-bordered w-full'
          value={newWorkout.name}
          onChange={(e) =>
            setNewWorkout({ ...newWorkout, name: e.target.value })
          }
          minLength={1}
          maxLength={50}
          required
        />
      </label>

      <label className='form-control w-full'>
        <div className='label'>
          <span className='label-text'>
            Part<span className='font-thin'> *</span>
          </span>
        </div>
        <select
          className='select select-bordered'
          value={newWorkout.part}
          onChange={(e) =>
            setNewWorkout({
              ...newWorkout,
              part: cvRomuWorkoutPartByInt(Number(e.target.value)),
            })
          }
          required
        >
          {Object.keys(RomuWorkoutPart).map((key) => (
            <option key={key} value={key}>
              {cvRomuWorkoutPartNameByEnum(cvRomuWorkoutPartByInt(Number(key)))}
            </option>
          ))}
        </select>
      </label>

      <label className='form-control w-full'>
        <div className='label'>
          <span className='label-text'>
            Type<span className='font-thin'> *</span>
          </span>
        </div>
        <select
          className='select select-bordered'
          value={newWorkout.type}
          onChange={(e) =>
            setNewWorkout({
              ...newWorkout,
              type: cvRomuWorkoutTypeByInt(Number(e.target.value)),
            })
          }
          required
        >
          {Object.keys(RomuWorkoutType).map((key) => (
            <option key={key} value={key}>
              {cvRomuWorkoutTypeNameByEnum(cvRomuWorkoutTypeByInt(Number(key)))}
            </option>
          ))}
        </select>
      </label>

      <label className='form-control'>
        <div className='label'>
          <span className='label-text'>Memo</span>
        </div>
        <textarea
          className='textarea textarea-bordered h-24'
          value={newWorkout.memo}
          onChange={(e) =>
            setNewWorkout({ ...newWorkout, memo: e.target.value })
          }
          maxLength={1000}
        ></textarea>
      </label>

      <div className='w-full py-4 flex justify-center'>
        <button
          className='btn btn-secondary w-fit'
          type='submit'
          onChange={() => _postWorkout()}
        >
          追加 / Add
        </button>
      </div>
    </form>
  )
}
