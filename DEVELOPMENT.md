# Development

## コミットメッセージプレフィクス

コミットは下記の種類に分けて分割し、コミットメッセージの先頭に対応する絵文字を追加すること。
該当する分類が存在しない場合は、追加を検討する。

- 🐛 バグの修正
- 🩹 重要ではない軽微な修正
- ✨ 新機能の追加
- 🎨 構造/フォーマットの修正
- ♻️ コードのリファクタリング
- ✅ テストの追加/更新
- 🍱 アセットを追加
- 🗃️ DB に関連する変更
- 🗑️ コードの非推奨化
- ⚰️ 不要コードの削除
- 🔨 開発用スクリプト/設定の修正
- 🌱 シードファイルの追加/修正
- 📱 レスポンシブ対応
- 💬 固定テキストの変更
- 💡 コード上のコメントを変更
- ✏️ タイポ修正
- ⬆️ 依存パッケージのバージョンアップ
- ⬇️ 依存パッケージのバージョンダウン
- 📝 ドキュメント、設計書の更新

## ブランチルール

- `main` ... リリース中
- `develop` ... 開発中ブランチ (派生元:`main`, マージ先:`main`)
- `release` ... 次回リリースブランチ (派生元:`develop`, マージ先:`main` or `develop`)
- `feature-xxx` ... 新機能開発ブランチ (派生元:`develop`, マージ先:`develop`)
- `fix-xxx` ... バグ修正ブランチ (派生元:`main`, マージ先:`main`or `develop`)
  - 初回リリースまでは`fix-xxx` → `main`
  - 以降は、緊急修正を行う場合にのみ`fix-xxx` → `main`
  - それ以外の場合は`fix-xxx` → `develop`

## 起動方法

### Docker

`compose.yml`にてアプリ、DB を定義している。

```sh
# コンテナ起動
docker compose up -d

# アプリコンテナへ
docker exec -it (コンテナ名 or コンテナID) bash

# Next.jsアプリ起動
npm run dev
```

### VSCode デバッグモード

`Next.js v14.2.15`では、`Docker`内のサーバーとローカル環境の`VSCode Debugger`の接続ができない。
ため、下記のコマンドを実行して`node_modules`内のコードを書き換える必要がある。
これは、`Next.js v14.3.x`にて修正される予定である。

```sh
sed -Ei '/NODE_OPTIONS.*nodeDebugType.*/s//NODE_OPTIONS = `${NODE_OPTIONS} --${nodeDebugType}=0.0.0.0:9230`;/' node_modules/next/dist/cli/next-dev.js
```

#### デバッガの起動方法(サーバーサイド)

下記のコマンドで、`Next.js`サーバーを起動する。

```sh
# デバッグポートを付与して起動
npm run debug
```

`VSCode`のデバッグにて`Next.js: debug server-side`を選択して、`Next.js`と接続する。

この状態で、ブレークポイントやウォッチを設定し、API を実行するとデバッグできるようになる。
