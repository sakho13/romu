# Romu

トレーニング記録アプリ

## 仕様

[仕様ドキュメント](./DOCUMENT.md)

## 開発

[開発ドキュメント](./DEVELOPMENT.md)

[問い合わせ Google フォーム](https://docs.google.com/forms/d/e/1FAIpQLScFK8I_yVuDWXYhwuixi_jRDY7tAKdECqdiPs8KS1XB_Fgzdg/viewform?usp=sf_link)

## ディレクトリ構成

```sh
src/
  app/ ... Next.jsのAppRouterに基づくディレクトリ
  components/ ... ATOMICデザインに基づいたディレクトリ構成とする
    atoms/ ... 基本的なコンポーネント Propsでのみ制御される（データ結合）
    molecules/ ... 状態（useState）を持つことが許されるコンポーネント
    organisms/ ... ストア,フェッチが許されるコンポーネント
    templates/ ... atoms,molecules,organismsで構成されるコンポーネント
    ui/ ... shadcn/ui用のディレクトリ
  lib/ ... ライブラリ関係のファイルグループ（ライブラリ側で固定の場合に使用する）
  services/ ... ここの直下にはスタティッククラスを配置する
    classes/ ... クラスはこのディレクトリ配下に
    functions/ ... 単体で機能する関数はこのディレクトリ配下に
    hooks/ ... フロントで使用するフックはこのディレクトリ配下に
  shadcn/ ... shadcn/uiのコンポーネント
  statics/ ... 固定値は分類分けしてこのディレクトリ配下に
  tests/ ... Jest
  types/ ... 全ての型定義はこのディレクトリ配下に
  utils/ ... ライブラリ関係のファイルグループ（デフォルト）
```
