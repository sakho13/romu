import { joinClassName } from "@/services/functions/joinClassName"
import { CenteringLayout } from "../atoms/CenteringLayout"

type Props = {
  id?: string
  className?: string
  children: [React.ReactNode, React.ReactNode]
}

export function SplittedColTemplate({
  id,
  className,
  children: [childrenLeft, childrenRight],
}: Props) {
  return (
    <CenteringLayout id={id} className={joinClassName(className ?? "")}>
      <div>{childrenLeft}</div>

      <div>{childrenRight}</div>
    </CenteringLayout>
  )
}
