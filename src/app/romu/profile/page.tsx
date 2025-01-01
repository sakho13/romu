"use client"

import { CenteringLayout } from "@/components/atoms/CenteringLayout"
import { RomuPageTitle } from "@/components/atoms/RomuPageTitle"
import { RomuProfileDetail } from "@/components/organisms/RomuProfileDetail"

export default function Page() {
  return (
    <CenteringLayout>
      <div className='flex flex-col items-center justify-center h-full mt-8'>
        <RomuPageTitle title='プロフィール' />

        <RomuProfileDetail />
      </div>
    </CenteringLayout>
  )
}
