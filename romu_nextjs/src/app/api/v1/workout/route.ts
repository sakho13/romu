import { RomuApi } from "@/services/classes/RomuApi"
import { RomuApiError } from "@/services/classes/RomuApiError"
import {
  cvRomuWorkoutPartByInt,
  cvRomuWorkoutTypeByInt,
} from "@/services/functions/convertValue"
import { RomuApiValidateService } from "@/services/RomuApiValidateService"
import { WorkoutsService } from "@/services/WorkoutsService"
import { prisma } from "@/utils/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const api = new RomuApi("Workout-GET")

  const result = await api.execute(async () => {
    const decoded = await api.verifyAuthorizationHeader(
      req.headers.get("authorization"),
    )

    const workoutId = api.getQueryParameter(req.url, "workoutId")
    if (workoutId === null || workoutId === "")
      throw new RomuApiError({
        errorCode: "InvalidInputRequiredParameter",
        column: "ワークアウトID",
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

export async function POST(req: NextRequest) {
  const api = new RomuApi("Workout-POST")

  const result = await api.execute(async () => {
    const decoded = await api.verifyAuthorizationHeader(
      req.headers.get("authorization"),
    )

    const body = await req.json()

    if (!RomuApiValidateService.validateWorkoutPostInput(body))
      throw new RomuApiError({
        errorCode: "UnknownError",
        param: {},
      })

    const result = await WorkoutsService.createCustomWorkout(
      prisma,
      decoded.uid,
      body,
    )

    return {
      workoutId: result.id,
    }
  })

  return NextResponse.json(result.data, { status: result.status })
}
