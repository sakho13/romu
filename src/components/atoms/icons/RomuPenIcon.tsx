import { joinClassName } from "@/services/functions/joinClassName"

export function RomuPenIcon({ className }: { className?: string }) {
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
      <path d='M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4' />{" "}
      <line x1='13.5' y1='6.5' x2='17.5' y2='10.5' />
    </svg>
  )
}
