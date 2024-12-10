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
  column?: string
}

export type ErrorUnitGenerator<E extends ErrorCode> = {
  errorCode: E
  param: ErrorMessageParams<E>
  column?: E extends `InvalidInput${string}` ? string : undefined
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
  "Workout-GET": "/api/v1/workout",
  "Workout-POST": "/api/v1/workout",

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
          : object
        : never
      : never
    : never

export type ApiResponse<selector extends ApiResponseSelector> =
  selector extends `${infer prefix}-${infer method}`
    ? prefix extends RomuApiPrefix
      ? method extends RomuApiMethods<prefix>
        ? RomuApiIO[prefix][method] extends { out: infer out }
          ? out
          : object
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
        name: string
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

  Workout: {
    GET: {
      input: {
        workoutId: string
      }
      out: {
        editable: boolean
        workout: RomuWorkout | null
      }
    }

    POST: {
      input: {
        name: string
        memo: string
        type: RomuWorkoutTypeEnum
        part: RomuWorkoutPartEnum
      }
      out: {
        workoutId: string
      }
    }
  }

  Trainings: {
    GET: {
      out: {
        a: string
      }
    }

    POST: {
      out: {
        a: string
      }
    }
  }
}
