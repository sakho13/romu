import { useState } from "react"

export function useLoading(init: boolean = false) {
  const [loading, setLoading] = useState(init)

  const startLoading = () => setLoading(true)

  const stopLoading = () => setLoading(false)

  return {
    loading,
    startLoading,
    stopLoading,
  }
}
