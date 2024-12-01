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
    const api = new RomuApi("User-GET")

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
      new RomuApiError({ errorCode: "AuthFailed", param: {} }),
    )
    const api = new RomuApi("User-GET")

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
    const api = new RomuApi("User-GET")

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

  test("executeが失敗する RomuApiError errorCode=InvalidInputTrimMinLength", async () => {
    const mainLogic = jest.fn()
    mainLogic.mockRejectedValueOnce(
      new RomuApiError({
        errorCode: "InvalidInputTrimMinLength",
        param: { column: "ニックネーム", minLength: "1" },
      }),
    )
    const api = new RomuApi("User-GET")

    await expect(api.execute(mainLogic)).resolves.toEqual({
      status: 400,
      data: {
        success: false,
        errors: [
          {
            errorCode: "InvalidInputTrimMinLength",
            message:
              "最小文字数を満たしていません ニックネームは1文字以上である必要があります",
          },
        ],
      },
    })
  })

  test("verifyAuthorizationHeaderが成功する", async () => {
    const api = new RomuApi("User-GET") as any
    api.verifyFirebaseIdToken = jest.fn().mockResolvedValue("decoded")
    const token = "Bearer token"
    const result = await api.verifyAuthorizationHeader(token)
    expect(result).toEqual("decoded")
  })

  test("verifyAuthorizationHeader デコードが失敗する", async () => {
    const api = new RomuApi("User-GET") as any
    api.verifyFirebaseIdToken = jest.fn().mockRejectedValue(new Error("error"))
    const token = "Bearer token"
    await expect(api.verifyAuthorizationHeader(token)).rejects.toThrow(
      new RomuApiError({ errorCode: "AuthFailed", param: {} }),
    )
  })

  test("verifyAuthorizationHeader tokenが空文字", async () => {
    const api = new RomuApi("User-GET") as any
    const token = ""
    await expect(api.verifyAuthorizationHeader(token)).rejects.toThrow(
      new RomuApiError({ errorCode: "AuthFailed", param: {} }),
    )
  })

  test("verifyAuthorizationHeader tokenが数値", async () => {
    const api = new RomuApi("User-GET") as any
    const token = 123456
    await expect(api.verifyAuthorizationHeader(token)).rejects.toThrow(
      new RomuApiError({ errorCode: "AuthFailed", param: {} }),
    )
  })

  test("verifyAuthorizationHeader tokenの形式「BearerToken」", async () => {
    const api = new RomuApi("User-GET") as any
    const token = "BearerToken"
    await expect(api.verifyAuthorizationHeader(token)).rejects.toThrow(
      new RomuApiError({ errorCode: "AuthFailed", param: {} }),
    )
  })
})
