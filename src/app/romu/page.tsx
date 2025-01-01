"use client"

import { RomuCalender } from "@/components/organisms/RomuCalender"
import { SplittedColTemplate } from "@/components/templates/SplittedColTemplate"
import { DateService } from "@/services/DateService"
import { useCalender } from "@/services/hooks/useCalender"

export default function RomuTopPage() {
  const { selectedDate, onSelectDate, currentMonth, onChangeMonth } =
    useRomuTopPage()

  return (
    <SplittedColTemplate id='romu-top-calender-log'>
      <RomuCalender
        selectedDate={selectedDate}
        onSelectDate={(date) => {
          if (date) onSelectDate(date)
        }}
        currentMonth={currentMonth}
        onChangeMonth={(date) => onChangeMonth(date)}
      />

      <div>
        <p>ここにトレーニング記録を表示</p>

        <p>{DateService.convertDateToFormattedJP(selectedDate)}</p>
      </div>
    </SplittedColTemplate>
  )
}

const useRomuTopPage = () => {
  const { selectedDate, onSelectDate, currentMonth, onChangeMonth } =
    useCalender()

  return {
    selectedDate,
    onSelectDate,
    currentMonth,
    onChangeMonth,
  }
}
