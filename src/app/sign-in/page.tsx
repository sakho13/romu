"use client"

import { CenteringLayout } from "@/components/atoms/CenteringLayout"
import { SignInForm } from "@/components/organisms/SignInForm"
import { useAuthStore } from "@/stores/useAuthStore"
import { redirect } from "next/navigation"

export default function SignInPage() {
  const { accessToken } = useAuthStore()

  if (accessToken) redirect("/romu")

  return (
    <CenteringLayout id='sign-in-page'>
      <div className='my-16'>
        <SignInForm />
      </div>
    </CenteringLayout>
  )
}
