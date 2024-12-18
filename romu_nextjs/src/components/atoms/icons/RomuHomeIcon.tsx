import { joinClassName } from "@/services/functions/joinClassName"

export function RomuHomeIcon({ className }: { className?: string }) {
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
      <polyline points='5 12 3 12 12 3 21 12 19 12' />{" "}
      <path d='M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7' />{" "}
      <path d='M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6' />
    </svg>
  )
}
