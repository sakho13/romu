import { RomuApi } from "@/services/classes/RomuApi"
import { RomuApiError } from "@/services/classes/RomuApiError"
import { UserService } from "@/services/UserService"
import { prisma } from "@/utils/prisma"
import { NextApiRequest } from "next"
import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextApiRequest) {
  const api = new RomuApi("User-GET")

  const result = await api.execute(async () => {
    const decoded = await api.verifyAuthorizationHeader(
      headers().get("authorization"),
    )

    const user = await UserService.getUserByFirebaseUid(prisma, decoded.uid, {
      email: decoded.email ?? "",
      name: decoded.name ?? "",
    })

    return {
      id: user.id,
      name: user.name ?? "",
    }
  })

  return NextResponse.json(result.data, { status: result.status })
}

export async function POST(req: NextApiRequest) {
  const api = new RomuApi("User-POST")

  const result = await api.execute(async () => {
    const decoded = await api.verifyAuthorizationHeader(
      headers().get("authorization"),
    )

    const user = await UserService.getUserByFirebaseUid(prisma, decoded.uid, {
      email: decoded.email ?? "",
      name: decoded.name ?? "",
    })

    return {
      id: user.id,
      email: user.email ?? "",
      name: user.name ?? "",
      message: `Hi, ${user.name}!`,
    }
  })

  return NextResponse.json(result.data, { status: result.status })
}

export async function PATCH(req: NextRequest) {
  const api = new RomuApi("User-PATCH")

  const result = await api.execute(async () => {
    const decoded = await api.verifyAuthorizationHeader(
      headers().get("authorization"),
    )

    const editUserData: Partial<{
      name: string
    }> = {}
    const body = await req.json()

    api.checkMultipleErrors([
      () => {
        if ("name" in body) {
          const name = body.name
          if (!(String(name).trim().length >= 1))
            throw new RomuApiError({
              errorCode: "InvalidInputTrimMinLength",
              param: { column: "name", minLength: "1" },
            })

          editUserData.name = name
        }
      },
    ])

    const user = await UserService.updateUserByFirebaseUid(
      prisma,
      decoded.uid,
      editUserData,
    )

    return {
      name: user.name,
    }
  })

  return NextResponse.json(result.data, { status: result.status })
}
