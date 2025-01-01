import { joinClassName } from "@/services/functions/joinClassName"

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
    <div
      id={id}
      className={joinClassName(
        "grid",
        "lg:gap-[8px] lg:grid-cols-4 lg:grid-rows-1",
        "grid-cols-1 grid-rows-2",
        className ?? "",
      )}
    >
      <div
        className={joinClassName(
          "lg:col-start-2 lg:row-start-1",
          "lg:mx-auto",
          "lg:border-b-0",
          "col-start-1 row-start-1",
          "flex justify-center",
          "border-b",
        )}
      >
        {childrenLeft}
      </div>

      <div
        className={joinClassName(
          "lg:col-start-3 lg:row-start-1",
          "lg:mx-auto",
          "col-start-1 row-start-2",
          "flex justify-center",
        )}
      >
        {childrenRight}
      </div>
    </div>
  )
}
