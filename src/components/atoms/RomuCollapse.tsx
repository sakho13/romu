import { joinClassName } from "@/services/functions/joinClassName"

type Props = {
  tabIndex: number
  label: string
  className?: string
  children: React.ReactNode
}

export function RomuCollapse({ tabIndex, label, className, children }: Props) {
  return (
    <div
      tabIndex={tabIndex}
      className={joinClassName(
        "collapse collapse-arrow border-base-300 bg-base-200 border",
        className ?? "",
      )}
    >
      <div className='collapse-title text-xl font-medium'>{label}</div>
      <div className='collapse-content'>{children}</div>
    </div>
  )
}
