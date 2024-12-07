"use client"

import { CenteringLayout } from "@/components/atoms/CenteringLayout"
import { RomuCalender } from "@/components/organisms/RomuCalender"
import { ApiV1Service } from "@/services/ApiService"
import { useCalender } from "@/services/hooks/useCalender"
import { useDate } from "@/services/hooks/useDate"
import { useEffect } from "react"

export default function RomuTopPage() {
  const calenderState = useCalender()

  return (
    <CenteringLayout>
      <div className=''>
        <h1>今日は{useRomuTopPage().today}です</h1>

        <RomuCalender calenderState={calenderState} />
      </div>

      <div>
        <p>ここにトレーニング記録を表示</p>

        <button onClick={() => ApiV1Service.getUser("aaaa")}>koko</button>
      </div>
    </CenteringLayout>
  )
}

const useRomuTopPage = () => {
  const { date, formatDate, initDate } = useDate()

  useEffect(() => {
    initDate()
  }, [])

  return {
    today: formatDate("/"),
  }
}
