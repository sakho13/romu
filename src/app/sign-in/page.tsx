"use client"

import { SignInForm } from "@/components/organisms/SignInForm"
import { useAuthStore } from "@/stores/useAuthStore"
import { redirect } from "next/navigation"

export default function SignInPage() {
  const { accessToken } = useAuthStore()

  if (accessToken) redirect("/romu")

  return (
    <div id='sign-in-page'>
      <SignInForm />
    </div>
  )
}
