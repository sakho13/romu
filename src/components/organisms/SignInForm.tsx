"use client"

import { ApiV1Service } from "@/services/ApiService"
import { joinClassName } from "@/services/functions/joinClassName"
import { useLoading } from "@/services/hooks/useLoading"
import { firebaseClient } from "@/utils/firebaseClient"
import {
  getRedirectResult,
  signInWithPopup,
  GithubAuthProvider,
  getAuth,
} from "firebase/auth"
import Link from "next/link"
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation"

type Provider = "github" | "google" | "spotify"

export function SignInForm() {
  const searchParam = useSearchParams()
  const message = searchParam.get("m")

  const path = usePathname()

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
          if (!jwt) {
            router.replace(`${path}?m=GitHub認証に失敗しました`)
            return
          }

          const resultApi = await ApiV1Service.postUser(jwt)
          router.replace(`/romu`)
        })
        .catch((_error) => {
          router.replace(`${path}?m=GitHub認証に失敗しました`)
        })
        .finally(() => doingAuth.stopLoading())
    }

    if (provider === "google") {
      // signInWithPopup(firebaseClient.auth, new GoogleAuthProvider())
    }
  }

  return (
    <div id='sign-in-form' className='border m-16 p-8'>
      <button
        id='github-sign-in-btn'
        className='btn btn-primary'
        onClick={async () => await signInWithOAuth("github")}
      >
        GitHub
      </button>

      <dialog className={joinClassName("modal")}>
        <div></div>
      </dialog>

      <p className={joinClassName("")}>{message ?? ""}</p>
    </div>
  )
}
