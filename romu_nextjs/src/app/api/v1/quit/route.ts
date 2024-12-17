import { RomuApi } from "@/services/classes/RomuApi"
import { UserService } from "@/services/UserService"
import { prisma } from "@/utils/prisma"
import { NextRequest, NextResponse } from "next/server"
export async function POST(req: NextRequest) {
  const api = new RomuApi("Quit-POST")

  const result = await api.execute(async () => {
    const decoded = await api.verifyAuthorizationHeader(
      req.headers.get("authorization"),
    )

    const user = await UserService.updateUserStatusAndDeleteAtByFirebaseUid(
      prisma,
      decoded.uid,
    )

    return {
      quit_at: user.deletedAt?.toLocaleString() ?? "9999/12/31 00:00:00",
    }
  })

  return NextResponse.json(result.data, { status: result.status })
}
