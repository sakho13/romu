import { joinClassName } from "@/services/functions/joinClassName"

export function RomuTrendUpIcon({ className }: { className?: string }) {
  return (
    <svg
      className={joinClassName("h-8 w-8", className ?? "")}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      strokeWidth='2'
      stroke='currentColor'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      {" "}
      <path stroke='none' d='M0 0h24v24H0z' />{" "}
      <polyline points='3 17 9 11 13 15 21 7' />{" "}
      <polyline points='14 7 21 7 21 14' />
    </svg>
  )
}
