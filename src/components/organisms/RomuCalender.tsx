import { joinClassName } from "@/services/functions/joinClassName"
import { Calendar } from "../ui/calendar"
import { ja } from "date-fns/locale"

type Props = {
  selectedDate: Date
  onSelectDate: (date?: Date) => void
  currentMonth: Date
  onChangeMonth: (date: Date) => void
}

export function RomuCalender({
  selectedDate,
  onSelectDate,
  currentMonth,
  onChangeMonth,
}: Props) {
  return (
    <div id='romu-calender' className={joinClassName("w-fit h-fit")}>
      <Calendar
        mode='single'
        selected={selectedDate}
        onSelect={onSelectDate}
        month={currentMonth}
        onMonthChange={onChangeMonth}
        locale={ja}
      />
    </div>
  )
}
