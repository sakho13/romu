import { joinClassName } from "@/services/functions/joinClassName"

type Props = {
  children: React.ReactNode
  id?: string
  className?: string
}

export function CenteringLayout({ children, id, className }: Props) {
  return (
    <div
      id={id}
      className={joinClassName(
        "flex justify-center items-center",
        "h-full",
        "pt-4",
        "w-full",
        className ?? "",
      )}
    >
      {children}
    </div>
  )
}
