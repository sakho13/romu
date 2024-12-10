"use client"

import { useAuthStore } from "@/stores/useAuthStore"
import { RomuHeader } from "@/components/organisms/RomuHeader"
import { joinClassName } from "@/services/functions/joinClassName"
import { RomuFeaturesCollapses } from "@/components/molecules/RomuFeaturesCollapses"
import { redirect } from "next/navigation"

export default function Home() {
  const { accessToken } = useAuthStore()

  if (accessToken) redirect("/romu")

  return (
    <div className=''>
      <RomuHeader type={accessToken ? "signed-in" : "before-signed-in"} />

      <main>
        <div
          className={joinClassName(
            "lg:h-[300px] h-[200px] flex justify-center items-center",
            "bg-base-100",
            "border-b",
          )}
        >
          <h1 className={joinClassName("select-none", "text-3xl font-bold")}>
            RoMu - <span className='text-lg'>Training Management System</span>
          </h1>
        </div>

        <section className='flex justify-center pt-4'>
          <div>
            <div className='my-4'>
              <h2 className='w-fit mx-auto text-xl font-bold select-none'>
                主な機能
              </h2>
            </div>

            <RomuFeaturesCollapses />
          </div>
        </section>
      </main>

      <footer className=''></footer>
    </div>
  )
}
