"use client"

import { RomuCalender } from "@/components/organisms/RomuCalender"
import { SplittedColTemplate } from "@/components/templates/SplittedColTemplate"
import { ApiV1Service } from "@/services/ApiService"
import { useCalender } from "@/services/hooks/useCalender"
import { useAuthStore } from "@/stores/useAuthStore"

export default function RomuTopPage() {
  const calenderState = useCalender()
  const { accessToken } = useAuthStore()

  return (
    <SplittedColTemplate id='romu-top-calender-log'>
      <div>
        <h1>今日は{useRomuTopPage().today}です</h1>

        <RomuCalender calenderState={calenderState} />
      </div>

      <div>
        <p>ここにトレーニング記録を表示</p>

        <button onClick={() => ApiV1Service.getUser(accessToken ?? "")}>
          koko
        </button>
      </div>
    </SplittedColTemplate>
  )
}

const useRomuTopPage = () => {
  // const { formatDate, initDate } = useDate()

  // useEffect(() => {
  //   initDate()
  // }, [initDate])

  return {
    today: "",
  }
}
