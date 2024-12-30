import { exponentialBackoff } from "@/services/functions/exponentialBackoff"

describe("services/functions/exponentialBackoff", () => {
  beforeEach(() => {
    jest.useRealTimers()
  })

  afterEach(() => {
    jest.clearAllTimers()
    jest.clearAllMocks()
  })

  test("成功する", async () => {
    const fn = jest.fn()
    fn.mockResolvedValue("success")
    await expect(exponentialBackoff(fn, 1, 100)).resolves.toBe("success")
    expect(fn).toHaveBeenCalledTimes(1)
  })

  test("指定回数リトライする", async () => {
    const fn = jest.fn()
    fn.mockRejectedValueOnce("error")
    fn.mockRejectedValueOnce("error")
    fn.mockResolvedValueOnce("success")
    await expect(exponentialBackoff(fn, 2, 100)).resolves.toBe("success")
    expect(fn).toHaveBeenCalledTimes(3)
  })

  test("指定回数リトライしても失敗する", async () => {
    const fn = jest.fn()
    fn.mockRejectedValue("error")
    await expect(exponentialBackoff(fn, 5, 100)).rejects.toBe("error")
    expect(fn).toHaveBeenCalledTimes(6)
  })
})
