"use client"

import { redirect } from "next/navigation"
import { Suspense } from "react"
import { toast } from "sonner"
import { SignInForm } from "@/components/organisms/SignInForm"
import { SingleColTemplate } from "@/components/templates/SingleColTemplate"
import { useAuthStore } from "@/stores/useAuthStore"

export default function SignInPage() {
  const { accessToken } = useAuthStore()

  if (accessToken) {
    toast.success("ログインに成功")
    redirect("/romu")
  }

  return (
    <SingleColTemplate id='sign-in-page'>
      <div className='my-16'>
        <Suspense>
          <SignInForm />
        </Suspense>
      </div>
    </SingleColTemplate>
  )
}
