"use client"

import { useAuthStore } from "@/stores/useAuthStore"
import { RomuHeader } from "@/components/organisms/RomuHeader"
import { joinClassName } from "@/services/functions/joinClassName"

export default function Home() {
  const { accessToken } = useAuthStore()

  return (
    <div className=''>
      <RomuHeader type={accessToken ? "signed-in" : "before-signed-in"} />

      <main>
        <div
          className={joinClassName(
            "h-[300px] flex justify-center items-center",
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
            <h2>主な機能</h2>

            <div>
              <div
                tabIndex={0}
                className='collapse collapse-arrow border-base-300 bg-base-200 border'
              >
                <div className='collapse-title text-xl font-medium'>
                  トレーニング記録
                </div>
                <div className='collapse-content'>
                  <p>
                    tabindex="0" attribute is necessary to make the div
                    focusable
                  </p>
                </div>
              </div>

              <div
                tabIndex={0}
                className='collapse collapse-arrow border-base-300 bg-base-200 border'
              >
                <div className='collapse-title text-xl font-medium'>
                  トレーニングメニュー
                </div>
                <div className='collapse-content'>
                  <p>
                    tabindex="0" attribute is necessary to make the div
                    focusable
                  </p>
                </div>
              </div>
            </div>
            {/*  */}
          </div>
        </section>
      </main>

      <footer className=''></footer>
    </div>
  )
}
