import { joinClassName } from "@/services/functions/joinClassName"
import { CenteringLayout } from "../atoms/CenteringLayout"

type Props = {
  id?: string
  className?: string
  children?: React.ReactNode
}

export function SingleColTemplate({ id, className, children }: Props) {
  return (
    <CenteringLayout id={id} className={joinClassName(className ?? "")}>
      {children}
    </CenteringLayout>
  )
}
