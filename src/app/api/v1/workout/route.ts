import { RomuApi } from "@/services/classes/RomuApi"
import { RomuApiError } from "@/services/classes/RomuApiError"
import { RomuApiErrors } from "@/services/classes/RomuApiErrors"
import {
  cvRomuWorkoutPartByInt,
  cvRomuWorkoutTypeByInt,
} from "@/services/functions/convertValue"
import { objectKeys } from "@/services/functions/objectKeys"
import { RomuApiValidateService } from "@/services/RomuApiValidateService"
import { WorkoutsService } from "@/services/WorkoutsService"
import { ApiRequest } from "@/types/ApiTypes"
import { RomuWorkoutPart, RomuWorkoutType } from "@/types/WorkoutType"
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
      headers().get("authorization"),
    )

    const body = await req.json()

    if (!validatePostInput(body))
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

function validatePostInput(body: any): body is ApiRequest<"Workout-POST"> {
  const error = new RomuApiErrors()

  const { data, error: requiredError } =
    RomuApiValidateService.checkRequiredParameterInObject(body, [
      { column: "name", name: "ワークアウト名" },
      { column: "memo", name: "メモ" },
      { column: "type", name: "種目" },
      { column: "part", name: "部位" },
    ])
  if (requiredError) throw requiredError

  if (typeof data.name !== "string")
    error.pushError(
      new RomuApiError({
        errorCode: "InvalidInputType",
        column: "name",
        param: { column: "ワークアウト名", type: "文字列" },
      }),
    )
  if (data.name.trim().length < 1)
    error.pushError(
      new RomuApiError({
        errorCode: "InvalidInputTrimMinLength",
        column: "name",
        param: { column: "ワークアウト名", minLength: "1" },
      }),
    )
  if (data.name.trim().length > 50)
    error.pushError(
      new RomuApiError({
        errorCode: "InvalidInputTrimMaxLength",
        column: "name",
        param: { column: "ワークアウト名", maxLength: "100" },
      }),
    )
  if (typeof data.memo !== "string")
    error.pushError(
      new RomuApiError({
        errorCode: "InvalidInputType",
        column: "memo",
        param: { column: "メモ", type: "文字列" },
      }),
    )
  if (data.memo.trim().length > 1000)
    error.pushError(
      new RomuApiError({
        errorCode: "InvalidInputTrimMaxLength",
        column: "memo",
        param: { column: "メモ", maxLength: "1000" },
      }),
    )
  if (!objectKeys(RomuWorkoutType).includes(data.type))
    error.pushError(
      new RomuApiError({
        errorCode: "InvalidInputEnum",
        column: "type",
        param: { column: "種目" },
      }),
    )
  if (!objectKeys(RomuWorkoutPart).includes(data.part))
    error.pushError(
      new RomuApiError({
        errorCode: "InvalidInputEnum",
        column: "part",
        param: { column: "部位" },
      }),
    )

  if (!error.isEmpty) throw error

  return true
}
