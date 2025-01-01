"use client"

import { useEffect } from "react"
import { useAuthStore } from "../../stores/useAuthStore"
import { firebaseClient } from "@/utils/firebaseClient"

type Props = {
  children: React.ReactNode
}

export function AuthProvider({ children }: Props) {
  const { setAccessToken } = useAuthStore()

  useEffect(() => {
    setAccessToken(null)

    const idTokenSubscriber = firebaseClient.auth.onIdTokenChanged(
      async (user) => {
        if (user) setAccessToken(await user.getIdToken())
        else setAccessToken(null)
      },
    )

    return () => idTokenSubscriber()
  }, [setAccessToken])

  return children
}
