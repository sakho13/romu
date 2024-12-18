/* eslint-disable @typescript-eslint/no-explicit-any */
import { RomuApi } from "@/services/classes/RomuApi"
import { RomuApiError } from "@/services/classes/RomuApiError"
import { RomuApiErrors } from "@/services/classes/RomuApiErrors"
import { UserService } from "@/services/UserService"

describe("services/classes/RomuApi", () => {
  describe("execute", () => {
    test("成功する", async () => {
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

    test("失敗する RomuApiError", async () => {
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

    test("失敗する Error", async () => {
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

    test("失敗する RomuApiError errorCode=InvalidInputTrimMinLength", async () => {
      const mainLogic = jest.fn()
      mainLogic.mockRejectedValueOnce(
        new RomuApiError({
          errorCode: "InvalidInputTrimMinLength",
          column: "ニックネーム",
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

    test("失敗する RomuApiErrors", async () => {
      const mainLogic = jest.fn()
      mainLogic.mockRejectedValueOnce(
        new RomuApiErrors(
          new RomuApiError({
            errorCode: "InvalidInputTrimMinLength",
            column: "name",
            param: {
              column: "ニックネーム",
              minLength: "1",
            },
          }).forRomuApiErrorsProp,
          new RomuApiError({
            errorCode: "InvalidInputEnum",
            column: "part",
            param: {
              column: "部位",
            },
          }).forRomuApiErrorsProp,
        ),
      )
      const api = new RomuApi("Workout-POST")

      await expect(api.execute(mainLogic)).resolves.toStrictEqual({
        status: 400,
        data: {
          success: false,
          errors: [
            {
              errorCode: "InvalidInputTrimMinLength",
              column: "name",
              message:
                "最小文字数を満たしていません ニックネームは1文字以上である必要があります",
            },
            {
              errorCode: "InvalidInputEnum",
              column: "part",
              message: "値が不正です 部位の選択値に誤りがあります",
            },
          ],
        },
      })
    })

    test("失敗する RomuApiErrors isEmpty=true", async () => {
      const mainLogic = jest.fn()
      mainLogic.mockRejectedValueOnce(new RomuApiErrors())
      const api = new RomuApi("Workout-POST")
      await expect(api.execute(mainLogic)).resolves.toStrictEqual({
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

  describe("verifyAuthorizationHeader", () => {
    test("成功する", async () => {
      const api = new RomuApi("User-GET") as any
      api.verifyFirebaseIdToken = jest
        .fn()
        .mockResolvedValue({ uid: "decoded", email: "email", name: "name" })
      const token = "Bearer token"
      const result = await api.verifyAuthorizationHeader(token)
      expect(result).toStrictEqual({
        uid: "decoded",
        email: "email",
        name: "name",
      })
    })

    test("デコードが失敗する", async () => {
      const api = new RomuApi("User-GET") as any
      api.verifyFirebaseIdToken = jest
        .fn()
        .mockRejectedValue(new Error("error"))
      const token = "Bearer token"
      await expect(api.verifyAuthorizationHeader(token)).rejects.toThrow(
        new RomuApiError({ errorCode: "AuthFailed", param: {} }),
      )
    })

    test("tokenが空文字", async () => {
      const api = new RomuApi("User-GET") as any
      const token = ""
      await expect(api.verifyAuthorizationHeader(token)).rejects.toThrow(
        new RomuApiError({ errorCode: "AuthFailed", param: {} }),
      )
    })

    test("tokenが数値", async () => {
      const api = new RomuApi("User-GET") as any
      const token = 123456
      await expect(api.verifyAuthorizationHeader(token)).rejects.toThrow(
        new RomuApiError({ errorCode: "AuthFailed", param: {} }),
      )
    })

    test("tokenの形式「BearerToken」", async () => {
      const api = new RomuApi("User-GET") as any
      const token = "BearerToken"
      await expect(api.verifyAuthorizationHeader(token)).rejects.toThrow(
        new RomuApiError({ errorCode: "AuthFailed", param: {} }),
      )
    })

    test("tokenの形式「Bearer 」", async () => {
      const api = new RomuApi("User-GET") as any
      const token = "Bearer "
      await expect(api.verifyAuthorizationHeader(token)).rejects.toThrow(
        new RomuApiError({ errorCode: "AuthFailed", param: {} }),
      )
    })
  })

  describe("verifyAuthorizationHeader 管理者ケース", () => {
    test("tokenの形式「RomuAdminBearer romu123 userid_romu123」管理者ユーザが存在する", async () => {
      const api = new RomuApi("User-GET") as any
      const token = "RomuAdminBearer romu123 userid_romu123"
      jest
        .spyOn(UserService, "getUserByFirebaseUidAdminRole")
        .mockResolvedValueOnce({
          id: "userid_romu123",
          firebaseUid: "romu123",
          email: "email",
          name: "name",
          createdAt: new Date(),
          role: 1,
          updatedAt: new Date(),
        })
      expect(await api.verifyAuthorizationHeader(token)).toStrictEqual({
        uid: "romu123",
        email: "email",
        name: "name",
      })
    })

    test("tokenの形式「RomuAdminBearer romu123 userid_romu123」管理者ユーザが存在しない", async () => {
      const api = new RomuApi("User-GET") as any
      const token = "RomuAdminBearer romu123 userid_romu123"
      jest
        .spyOn(UserService, "getUserByFirebaseUidAdminRole")
        .mockResolvedValueOnce(null)
      await expect(api.verifyAuthorizationHeader(token)).rejects.toThrow(
        new RomuApiError({ errorCode: "AuthFailed", param: {} }),
      )
    })

    test("tokenの形式「RomuAdminBearer romu1234 userid_romu123」管理者ユーザが存在するがトークンが違う", async () => {
      const api = new RomuApi("User-GET") as any
      const token = "RomuAdminBearer romu1234 userid_romu123"
      jest
        .spyOn(UserService, "getUserByFirebaseUidAdminRole")
        .mockResolvedValueOnce({
          id: "userid_romu123",
          firebaseUid: "romu123",
          email: "email",
          name: "name",
          createdAt: new Date(),
          role: 1,
          updatedAt: new Date(),
        })
      await expect(api.verifyAuthorizationHeader(token)).rejects.toThrow(
        new RomuApiError({ errorCode: "AuthFailed", param: {} }),
      )
    })
  })

  describe("getQueryParameter", () => {
    test("存在するパラメータを取得", () => {
      const api = new RomuApi("Workout-GET")
      const result = api.getQueryParameter(
        "http://localhost?workoutId=asdfghjkl",
        "workoutId",
      )
      expect(result).toEqual("asdfghjkl")
    })

    test("存在しないパラメータを取得", () => {
      const api = new RomuApi("Workout-GET")
      const result = api.getQueryParameter("http://localhost", "workoutId")
      expect(result).toEqual(null)
    })

    test("空文字のパラメータを取得", () => {
      const api = new RomuApi("Workout-GET")
      const result = api.getQueryParameter(
        "http://localhost?workoutId=",
        "workoutId",
      )
      expect(result).toEqual(null)
    })

    test("数値のパラメータを取得", () => {
      const api = new RomuApi("Workout-GET")
      const result = api.getQueryParameter(
        "http://localhost?workoutId=1",
        "workoutId",
      )
      expect(result).toEqual("1")
    })
  })
})
