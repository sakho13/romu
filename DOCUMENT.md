# about

## 機能

- ユーザ認証機能
- トレーニング記録機能
  - 日毎に記録できる
  - ワークアウトを選択して重量・回数を記録する
- 分析機能
  - RM換算
  - 総レップ・セット推移

## ページ

- (root)
  - /top
  - /sign-in ... ログイン・サインアップ
  - /romu
    - / ... ホーム画面(ユーザ未ログインの時 /romu/sign-in へリダイレクト)
    - /profile
    - /training
      - /edit?date=yyyymmdd ... トレーニング編集画面
  - /api
    - /health ... GET ヘルスチェック
    - /v1
      - /user
      - /users ... 実装予定なし
      - /trainings
      - /workouts
      - /analytics
        - /rm
        - /sets-reps

## 主な処理フロー

### 日毎トレーニング記録

使用場面：ジムでトレーニングをしながら

1. ホーム画面のカレンダーで日付を選択
2. FABをクリック
3. トレーニング編集画面
4. ワークアウトを追加
