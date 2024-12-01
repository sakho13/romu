import { ErrorCodes } from "@/statics/ErrorCodes"
import { StringToParam } from "./CommonTypes"
import {
  RomuWorkout,
  RomuWorkoutPartEnum,
  RomuWorkoutTypeEnum,
} from "./WorkoutType"

export type RomuApiResponse<S extends ApiResponseSelector> =
  | {
      status: 200
      data: {
        success: true
        data: ApiResponse<S>
      }
    }
  | {
      status: number
      data: {
        success: false
        errors: RomuApiErrorUnit[]
      }
    }

export type RomuApiErrorUnit = {
  errorCode: ErrorCode
  message: string
}

export type ErrorUnitGenerator<E extends ErrorCode> = {
  errorCode: E
  param: ErrorMessageParams<E>
}

export type ErrorMessageParams<E extends ErrorCode> = {
  [p in StringToParam<ErrorMessage<E>>]: string
}

export type ErrorCode = keyof typeof ErrorCodes
type ErrorMessage<E extends ErrorCode> = (typeof ErrorCodes)[E]["message"]

// ****************************************************

export const ApiPath: {
  [p in ApiResponseSelector]: string
} = {
  "User-GET": "/api/v1/user",
  "User-POST": "/api/v1/user",
  "User-PATCH": "/api/v1/user",

  "Workouts-GET": "/api/v1/workouts",

  "Trainings-GET": "/api/v1/trainings",
  "Trainings-POST": "/api/v1/trainings",
}

type RomuApiPrefix = keyof RomuApiIO

type RomuApiMethods<P extends RomuApiPrefix> = keyof RomuApiIO[P]

type RomuApiDefinedMethods = {
  [p in RomuApiPrefix]: RomuApiMethods<p>
}

export type ApiResponseSelector = {
  [p in RomuApiPrefix]: `${p}-${RomuApiDefinedMethods[p]}`
}[RomuApiPrefix]

export type ApiRequest<selector extends ApiResponseSelector> =
  selector extends `${infer prefix}-${infer method}`
    ? prefix extends RomuApiPrefix
      ? method extends RomuApiMethods<prefix>
        ? RomuApiIO[prefix][method] extends { input: infer input }
          ? input
          : {}
        : never
      : never
    : never

export type ApiResponse<selector extends ApiResponseSelector> =
  selector extends `${infer prefix}-${infer method}`
    ? prefix extends RomuApiPrefix
      ? method extends RomuApiMethods<prefix>
        ? RomuApiIO[prefix][method] extends { out: infer out }
          ? out
          : {}
        : never
      : never
    : never

type RomuApiIO = {
  User: {
    POST: {
      out: {
        id: string
        email: string
        name: string
        message: string
      }
    }

    GET: {
      out: {
        id: string
        name: string
      }
    }

    PATCH: {
      input: Partial<{
        name: string | null
      }>

      out: {
        name: string
      }
    }
  }

  Workouts: {
    GET: {
      out: {
        workouts: RomuWorkout[]
      }
    }
  }

  Trainings: {
    GET: {
      out: {}
    }

    POST: {
      out: {}
    }
  }
}
