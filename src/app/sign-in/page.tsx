"use client"

import { SignInForm } from "@/components/organisms/SignInForm"
import { SingleColTemplate } from "@/components/templates/SingleColTemplate"
import { useAuthStore } from "@/stores/useAuthStore"
import { redirect } from "next/navigation"
import { Suspense } from "react"

export default function SignInPage() {
  const { accessToken } = useAuthStore()

  if (accessToken) redirect("/romu")

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
