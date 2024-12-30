"use client"

import { ApiV1Service } from "@/services/ApiService"
import { useLoading } from "@/services/hooks/useLoading"
import { firebaseClient } from "@/utils/firebaseClient"
import { signInWithPopup, GithubAuthProvider } from "firebase/auth"
import { useRouter, useSearchParams } from "next/navigation"

type Provider = "github" | "google" | "spotify"

export function SignInForm() {
  const searchParam = useSearchParams()
  const message = searchParam.get("m")

  const router = useRouter()

  const doingAuth = useLoading()

  const signInWithOAuth = async (provider: Provider) => {
    console.log("signInWithOAuth", provider, firebaseClient.auth)

    if (doingAuth.loading) return

    if (provider === "github") {
      doingAuth.startLoading()
      signInWithPopup(firebaseClient.auth, new GithubAuthProvider())
        .then(async (userCredential) => {
          console.log("result", userCredential)
          const jwt = await userCredential?.user.getIdToken()
          console.log("jwt", jwt)
          if (!jwt) {
            // router.replace(`${path}?m=GitHub認証に失敗しました`)
            return
          }

          await ApiV1Service.postUser(jwt)
          router.replace(`/romu`)
        })
        .catch((err) => {
          console.log("error", err)
          // router.replace(`${path}?m=GitHub認証に失敗しました`)
        })
        .finally(() => doingAuth.stopLoading())
    }

    if (provider === "google") {
      // signInWithPopup(firebaseClient.auth, new GoogleAuthProvider())
    }
  }

  return (
    <div
      id='sign-in-form'
      className='border rounded-2xl p-8 lg:w-[400px] w-full'
    >
      <div className='w-full'>
        <p className='w-fit mx-auto my-4 font-bold text-2xl'>RoMu ログイン</p>
      </div>

      <button
        id='github-sign-in-btn'
        className='btn btn-primary w-full'
        onClick={async () => await signInWithOAuth("github")}
      >
        <svg
          className='h-8 w-8'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          {" "}
          <path d='M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22' />
        </svg>
        GitHub
      </button>

      <div className='w-full'>
        <p className='w-fit mx-auto my-4'>{message ?? ""}</p>
      </div>
    </div>
  )
}
