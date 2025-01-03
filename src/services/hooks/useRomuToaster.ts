import { useToast } from "@/hooks/use-toast"

type ShowSuccessType = {
  message: string
}

type ShowErrorType = {
  message: string
}

/**
 * トースト表示用のカスタムフック
 */
export function useRomuToaster() {
  const { toast } = useToast()

  /**
   * 何らかの処理の成功時に呼び出す
   * @description 編集成功、削除成功など
   */
  const _showSuccess = (data: ShowSuccessType) => {
    toast({
      variant: "default",
      title: "😎 Success!",
      description: data.message,
      duration: 5000,
    })
  }

  /**
   * 致命的なエラー時に呼び出す
   * @description サーバーエラーなど
   */
  const _showError = (data: ShowErrorType) => {
    toast({
      variant: "destructive",
      title: "🙇 Error",
      description: data.message,
      duration: 60000,
    })
  }

  return {
    showSuccess: _showSuccess,
    showError: _showError,
  }
}
