import { RomuApi } from "@/services/classes/RomuApi"
import { UserService } from "@/services/UserService"
import { prisma } from "@/utils/prisma"
import { NextApiRequest } from "next"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(req: NextApiRequest) {
  const api = new RomuApi("User-GET", req)

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
  const api = new RomuApi("User-POST", req)

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
