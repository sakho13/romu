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
  InvalidInputTrimMaxLength: {
    status: 400,
    message:
      "最大文字数を超えています [column]は[maxLength]文字以下である必要があります",
  },
  InvalidInputTrimLength: {
    status: 400,
    message:
      "文字数が不正です [column]は[minLength]文字以上[maxLength]文字以下である必要があります",
  },
  InvalidInputIntegerMin: {
    status: 400,
    message: "最小値を満たしていません [column]は[min]以上である必要があります",
  },
  InvalidInputIntegerMax: {
    status: 400,
    message: "最大値を超えています [column]は[max]以下である必要があります",
  },
  InvalidInputIntegerRange: {
    status: 400,
    message: "値が不正です [column]は[min]以上[max]以下である必要があります",
  },
  InvalidInputRequiredNumber: {
    status: 400,
    message: "[column]は整数である必要があります",
  },
  InvalidInputEnum: {
    status: 400,
    message: "値が不正です [column]の選択値に誤りがあります",
  },
} as const
