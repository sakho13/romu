type Props = {
  className?: string
}

export function LoadingIcon({ className }: Props) {
  return (
    <span
      className={`loading loading-ring loading-lg ${className ?? ""}`}
    ></span>
  )
}
