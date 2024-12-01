import { CenteringLayout } from "@/components/atoms/CenteringLayout"
import { RomuPageTitle } from "@/components/atoms/RomuPageTitle"
import { RomuWorkoutList } from "@/components/organisms/RomuWorkoutList"

export default function WorkoutsPage() {
  return (
    <CenteringLayout>
      <div className='flex flex-col items-center justify-center h-full mt-8'>
        <RomuPageTitle title='登録済みワークアウト' />

        <RomuWorkoutList />
      </div>
    </CenteringLayout>
  )
}
