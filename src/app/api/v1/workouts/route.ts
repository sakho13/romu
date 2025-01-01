import { RomuApi } from "@/services/classes/RomuApi"
import {
  cvRomuWorkoutPartByInt,
  cvRomuWorkoutTypeByInt,
} from "@/services/functions/convertValue"
import { WorkoutsService } from "@/services/WorkoutsService"
import { prisma } from "@/utils/prisma"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  const api = new RomuApi("Workouts-GET")

  const result = await api.execute(async () => {
    const decoded = await api.verifyAuthorizationHeader(
      req.headers.get("authorization"),
    )
    const workouts = await WorkoutsService.getWorkouts(prisma, decoded.uid)

    return {
      workouts: workouts.map((workout) => ({
        id: workout.id,
        name: workout.name,
        memo: workout.memo,
        type: cvRomuWorkoutTypeByInt(workout.type),
        part: cvRomuWorkoutPartByInt(workout.part),
        isDefault: workout.isDefault,
      })),
    }
  })

  return NextResponse.json(result.data, { status: result.status })
}
