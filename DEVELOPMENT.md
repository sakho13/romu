# Development

## コミットメッセージプレフィクス

コミットは下記の種類に分けて分割し、コミットメッセージの先頭に対応する絵文字を追加すること。
該当する分類が存在しない場合は、追加を検討する。

- 🐛 バグの修正
- 🩹 重要ではない軽微な修正
- ✨ 新機能の追加
- 🎨 構造/フォーマットの修正
- ♻️　コードのリファクタリング
- ✅ テストの追加/更新
- 🍱 アセットを追加
- 🗃️ DBに関連する変更
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

## 起動方法

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
