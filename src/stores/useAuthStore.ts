import { create } from "zustand"

interface AuthState {
  /**
   * null: loading
   * undefined: not authenticated
   */
  accessToken: string | null | undefined
  setAccessToken: (accessToken: string | null | undefined) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: undefined,
  setAccessToken: (accessToken) => set({ accessToken }),
}))
