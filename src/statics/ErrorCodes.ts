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
  RequiredParameter: {
    status: 400,
    message: "[column]は必須項目です",
  },
  InvalidInputTrimMinLength: {
    status: 400,
    message:
      "最小文字数を満たしていません [column]は[minLength]文字以上である必要があります",
  },
} as const
