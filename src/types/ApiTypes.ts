import { StringToParam } from "./CommonTypes"

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

export type ErrorUnitGenerator<E extends ErrorCode> =
  ErrorMessageParams<E> extends {}
    ? {
        errorCode: E
      }
    : {
        errorCode: E
        param: ErrorMessageParams<E>
      }

export type ErrorMessageParams<E extends ErrorCode> = {
  [p in StringToParam<ErrorMessage<E>>]: string
}

export type ErrorCode = keyof typeof ErrorCodes
type ErrorMessage<E extends ErrorCode> = (typeof ErrorCodes)[E]["message"]

export const ErrorCodes = {
  UnknownError: {
    status: 400,
    message: "不明なエラーが発生しました",
  },
  AuthFailed: {
    status: 401,
    message: "認証に失敗しました",
  },
  DbConnectionFailed: {
    status: 400,
    message: "データベースに接続できませんでした",
  },
  NoPermission: {
    status: 400,
    message: "権限がありません ユーザID:[userId]",
  },
} as const

// ****************************************************

export const ApiPath: {
  [p in ApiResponseSelector]: string
} = {
  "User-GET": "/api/v1/user",
  "User-POST": "/api/v1/user",
  "User-PUT": "/api/v1/user",

  "Users-GET": "/api/v1/users",

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

    PUT: {
      input: {
        name: string | null | undefined
      }

      out: {
        id: string
        name: string
      }
    }
  }

  Users: {
    GET: {
      out: {
        users: {
          id: string
          name: string
        }[]
      }
    }
  }

  Workouts: {
    GET: {
      out: {
        workouts: {
          id: string
          name: string
        }[]
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
