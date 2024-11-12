"use client"

import { useEffect } from "react"
import { useAuthStore } from "../../stores/useAuthStore"
import { firebaseClient } from "@/utils/firebaseClient"

type Props = {
  children: React.ReactNode
}

export function AuthProvider({ children }: Props) {
  const { accessToken, setAccessToken } = useAuthStore()

  useEffect(() => {
    setAccessToken(null)

    firebaseClient.auth.onIdTokenChanged(async (user) => {
      console.log("onIdTokenChanged", user)

      if (user) setAccessToken(await user.getIdToken())
      else setAccessToken(undefined)
    })

    if (!accessToken) setAccessToken(undefined)

    // firebaseClient.auth.onAuthStateChanged(async (user) => {
    //   console.log("onAuthStateChanged", user)
    // })
  }, [])

  return children
}
