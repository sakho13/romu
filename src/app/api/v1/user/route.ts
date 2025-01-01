import { RomuApi } from "@/services/classes/RomuApi"
import { RomuApiError } from "@/services/classes/RomuApiError"
import { RomuApiValidateService } from "@/services/RomuApiValidateService"
import { UserService } from "@/services/UserService"
import { prisma } from "@/utils/prisma"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  const api = new RomuApi("User-GET")

  const result = await api.execute(async () => {
    const decoded = await api.verifyAuthorizationHeader(
      req.headers.get("authorization"),
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

export async function POST(req: NextRequest) {
  const api = new RomuApi("User-POST")

  const result = await api.execute(async () => {
    const decoded = await api.verifyAuthorizationHeader(
      req.headers.get("authorization"),
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
      req.headers.get("authorization"),
    )

    const body = await req.json()

    if (!RomuApiValidateService.validateUserPatchInput(body))
      throw new RomuApiError({
        errorCode: "UnknownError",
        param: {},
      })

    const user = await UserService.updateUserByFirebaseUid(
      prisma,
      decoded.uid,
      body,
    )

    return {
      name: user.name,
    }
  })

  return NextResponse.json(result.data, { status: result.status })
}
