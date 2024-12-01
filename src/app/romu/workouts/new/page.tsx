"use client"
import { CenteringLayout } from "@/components/atoms/CenteringLayout"
import { RomuPageTitle } from "@/components/atoms/RomuPageTitle"

export default function NewWorkoutPage() {
  return (
    <CenteringLayout>
      <div>
        <RomuPageTitle title='カスタムワークアウトを作成' />
      </div>
    </CenteringLayout>
  )
}
