"use client"

import { CenteringLayout } from "@/components/atoms/CenteringLayout"
import { ApiV1Service } from "@/services/ApiService"
import { joinClassName } from "@/services/functions/joinClassName"
import { useLoading } from "@/services/hooks/useLoading"
import { UserService } from "@/services/UserService"
import { useAuthStore } from "@/stores/useAuthStore"
import { firebaseClient } from "@/utils/firebaseClient"
import { useEffect, useState } from "react"

type ProfileState = {
  id: string
  name: string
}

export default function Page() {
  const { accessToken } = useAuthStore()
  const [profile, setProfile] = useState<ProfileState>({
    id: "",
    name: "",
  })

  const loading = useLoading(false)

  const _fetchProfile = async () => {
    if (loading.loading) return
    loading.startLoading()

    if (!accessToken) {
      loading.stopLoading()
      return
    }

    try {
      const result = await ApiV1Service.getUser(accessToken)
      console.log("result", result)
      if (result.success) setProfile({ ...result.data })
    } catch (error) {
    } finally {
      loading.stopLoading()
    }
  }

  const _updateProfile = async () => {
    if (loading.loading) return
    loading.startLoading()

    if (!accessToken) {
      loading.stopLoading()
      return
    }

    try {
      const result = await ApiV1Service.patchUser(accessToken, {
        name: profile.name,
      })
      if (result.success) {
        //
      }
    } catch (error) {
    } finally {
      loading.stopLoading()
    }
  }

  useEffect(() => {
    _fetchProfile()
  }, [accessToken])

  return (
    <CenteringLayout>
      <div className='flex flex-col items-center justify-center h-full mt-8'>
        <h1 className='text-4xl font-bold my-2'>Profile</h1>

        <label className='input input-bordered flex items-center gap-2 my-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            fill='currentColor'
            className='h-4 w-4 opacity-70'
          >
            <path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z' />
          </svg>
          <input
            type='text'
            className='grow'
            placeholder='Nickname'
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
        </label>

        <div>
          <button
            onClick={_updateProfile}
            className={joinClassName("btn btn-secondary")}
          >
            編集 / Edit
          </button>
        </div>

        <div className='border w-full my-8' />

        <div>
          <div className='my-4 select-none'>
            <p className='text-lg font-bold text-red-700'>アカウント削除</p>
            <p className='mx-4'>アカウントに紐づくデータを削除します。</p>
          </div>

          <div className='mx-4'>
            <button className='btn btn-error'>退会 / Quit</button>
          </div>
        </div>
      </div>
    </CenteringLayout>
  )
}
