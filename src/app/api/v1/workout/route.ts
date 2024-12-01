import { RomuApi } from "@/services/classes/RomuApi"
import { RomuApiError } from "@/services/classes/RomuApiError"
import {
  cvRomuWorkoutPartByInt,
  cvRomuWorkoutTypeByInt,
} from "@/services/functions/convertValue"
import { WorkoutsService } from "@/services/WorkoutsService"
import { prisma } from "@/utils/prisma"
import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const api = new RomuApi("Workout-GET")

  const result = await api.execute(async () => {
    const decoded = await api.verifyAuthorizationHeader(
      headers().get("authorization"),
    )

    const workoutId = api.getQueryParameter(req.url, "workoutId")
    if (workoutId === null || workoutId === "")
      throw new RomuApiError({
        errorCode: "RequiredParameter",
        param: { column: "workoutId" },
      })

    const workout = await WorkoutsService.getWorkout(
      prisma,
      decoded.uid,
      workoutId,
    )
    if (!workout)
      return {
        editable: false,
        workout: null,
      }

    return {
      editable: !workout.isDefault,
      workout: {
        id: workout.id,
        name: workout.name,
        type: cvRomuWorkoutTypeByInt(workout.type),
        part: cvRomuWorkoutPartByInt(workout.part),
        memo: workout.memo,
        isDefault: workout.isDefault,
      },
    }
  })

  return NextResponse.json(result.data, { status: result.status })
}