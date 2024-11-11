import { RomuApi } from "@/services/classes/RomuApi"
import { RomuApiError } from "@/services/classes/RomuApiError"
import * as admin from "firebase-admin"

describe("services/classes/RomuApi", () => {
  beforeAll(() => {
    ;(admin.initializeApp as any) = jest.fn()
  })

  test("executeが成功する", async () => {
    const mainLogic = jest.fn()
    mainLogic.mockResolvedValue("success")
    const api = new RomuApi("User-GET", {} as any)

    await expect(api.execute(mainLogic)).resolves.toEqual({
      status: 200,
      data: {
        success: true,
        data: "success",
      },
    })
  })

  test("executeが失敗する RomuApiError", async () => {
    const mainLogic = jest.fn()
    mainLogic.mockRejectedValueOnce(
      new RomuApiError({ errorCode: "AuthFailed" }),
    )
    const api = new RomuApi("User-GET", {} as any)

    await expect(api.execute(mainLogic)).resolves.toEqual({
      status: 401,
      data: {
        success: false,
        errors: [
          {
            errorCode: "AuthFailed",
            message: "認証に失敗しました",
          },
        ],
      },
    })
  })

  test("executeが失敗する Error", async () => {
    const mainLogic = jest.fn()
    mainLogic.mockRejectedValueOnce(new Error("error"))
    const api = new RomuApi("User-GET", {} as any)

    await expect(api.execute(mainLogic)).resolves.toEqual({
      status: 400,
      data: {
        success: false,
        errors: [
          {
            errorCode: "UnknownError",
            message: "不明なエラーが発生しました",
          },
        ],
      },
    })
  })
})
