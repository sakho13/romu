import { joinClassName } from "@/services/functions/joinClassName"

type Props = {
  children: React.ReactNode
  className?: string
}

export function CenteringLayout({ children, className }: Props) {
  return (
    <div
      className={joinClassName(
        "flex justify-center items-center",
        "h-full",
        "pt-4",
        className ?? "",
      )}
    >
      {children}
    </div>
  )
}
