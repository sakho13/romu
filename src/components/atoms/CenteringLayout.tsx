import { joinClassName } from "@/services/functions/joinClassName"

type Props = {
  children: React.ReactNode
}

export function CenteringLayout({ children }: Props) {
  return (
    <div
      className={joinClassName(
        "flex justify-center items-center",
        "h-full",
        "pt-4",
      )}
    >
      {children}
    </div>
  )
}
