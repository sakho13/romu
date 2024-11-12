"use client"

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

  useEffect(() => {
    _fetchProfile()
  }, [accessToken])

  return (
    <div className='flex flex-col items-center justify-center h-full space-y-4'>
      <h1 className='text-4xl font-bold'>Profile</h1>
      <p className='text-lg'>This is your profile page.</p>
      <p>Name: {profile.name}</p>

      <div>
        <p>Delete Account</p>

        <button className={joinClassName("text-red-500")}>DELETE</button>
      </div>
    </div>
  )
}
