import { joinClassName } from "@/services/functions/joinClassName"

describe("services/functions/joinClassName", () => {
  test("成功する", () => {
    const classNames = ["navbar", "border-b", "px-16"]
    expect(joinClassName(...classNames)).toBe("navbar border-b px-16")
  })

  test("空文字列を返す", () => {
    const classNames: string[] = []
    expect(joinClassName(...classNames)).toBe("")
  })

  test("空白を返す", () => {
    const classNames = ["", ""]
    expect(joinClassName(...classNames)).toBe(" ")
  })

  test("空白を含む文字列を返す", () => {
    const classNames = ["navbar", "border-b", "px-16", ""]
    expect(joinClassName(...classNames)).toBe("navbar border-b px-16 ")
  })
})
