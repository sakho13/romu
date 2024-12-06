"use client"

import { CenteringLayout } from "@/components/atoms/CenteringLayout"
import { RomuPageTitle } from "@/components/atoms/RomuPageTitle"
import { RomuWorkoutDetail } from "@/components/organisms/RomuWorkoutDetail"
import { useEffect, useState } from "react"

type Props = {
  params: Promise<{ workoutId: string }>
}

export default function WorkoutsDetailPage({ params }: Props) {
  const [workoutId, setWorkoutId] = useState<string | null>(null)

  const _onChangeWorkoutId = async () => {
    setWorkoutId((await params).workoutId)
  }

  useEffect(() => {
    _onChangeWorkoutId()
  }, [params])

  return (
    <CenteringLayout>
      <div className='flex flex-col items-center justify-center h-full mt-8'>
        <RomuPageTitle title='ワークアウト詳細' />

        {workoutId ? (
          <RomuWorkoutDetail workoutId={workoutId} />
        ) : (
          <div>
            <p>URLが不正な構造です</p>
          </div>
        )}
      </div>
    </CenteringLayout>
  )
}
