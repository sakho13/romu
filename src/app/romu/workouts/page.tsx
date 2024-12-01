import { CenteringLayout } from "@/components/atoms/CenteringLayout"
import { RomuWorkoutList } from "@/components/organisms/RomuWorkoutList"
import { joinClassName } from "@/services/functions/joinClassName"

export default function WorkoutsPage() {
  return (
    <CenteringLayout>
      <div className='flex flex-col items-center justify-center h-full mt-8'>
        <h1 className={joinClassName("text-lg font-bold select-none")}>
          登録済みワークアウト
        </h1>

        <RomuWorkoutList />
      </div>
    </CenteringLayout>
  )
}
