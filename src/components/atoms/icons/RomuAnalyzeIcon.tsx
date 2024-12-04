import { joinClassName } from "@/services/functions/joinClassName"

export function RomuAnalyzeIcon({ className }: { className?: string }) {
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
      <polyline points='21 12 17 12 14 20 10 4 7 12 3 12' />
    </svg>
  )
}
