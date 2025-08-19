# ClubDAM API Next.js WebUI

Next.js + React + Shadcn/ui + Tailwind CSSで作成されたClubDAM APIの検索WebUIです。楽曲の長さを分秒形式（MM:SS）で表示する機能も含まれています。

## 🌟 特徴

- ⚡ **Next.js 14** - 最新のReact フレームワーク
- 🎨 **Shadcn/ui** - モダンなUIコンポーネント
- 💨 **Tailwind CSS** - ユーティリティファーストCSS
- 🎵 **楽曲検索** - 楽曲名・アーティスト名での検索
- ⏰ **楽曲長さ表示** - 分秒形式（例：4:05）での表示
- 🚀 **クイック検索** - アニメ、VOCALOID、デュエット楽曲
- 📱 **レスポンシブ** - モバイル対応デザイン
- 🔧 **TypeScript** - 型安全性

## 🛠️ セットアップ

### 必要な環境

- Node.js 18.17 以上
- npm または yarn または pnpm

### インストール

```bash
# 依存関係のインストール
npm install

# または
yarn install

# または
pnpm install
```

### 開発サーバーの起動

```bash
# 開発モード
npm run dev

# または
yarn dev

# または
pnpm dev
```

開発サーバーが起動すると、[http://localhost:3000](http://localhost:3000)でアクセスできます。

### 本番ビルド

```bash
# ビルド
npm run build

# 本番サーバー起動
npm run start
```

## 🚀 Vercelデプロイ

### 前提条件

- GitHub/GitLab/Bitbucketアカウント
- Vercelアカウント（GitHub連携推奨）

### デプロイ手順

1. **リポジトリ作成**
```bash
git init
git add .
git commit -m "Initial commit: ClubDAM API Next.js WebUI"
git branch -M main
git remote add origin https://github.com/your-username/dam-api.git
git push -u origin main
```

2. **Vercelでデプロイ**
- [Vercel](https://vercel.com)にアクセス
- GitHubアカウントでサインアップ/ログイン
- 「New Project」をクリック
- このリポジトリを選択
- 「Deploy」をクリック

3. **自動デプロイ設定**
- mainブランチへのpush時に自動デプロイ
- プレビューデプロイも自動生成

### Vercelのメリット

- ✅ **サーバーレス環境** - ローカルの制限を回避
- ✅ **高速CDN** - 世界中で高速アクセス
- ✅ **自動HTTPS** - セキュアな接続
- ✅ **無料プラン** - 個人利用なら十分
- ✅ **簡単デプロイ** - git push だけで自動更新

## 🚀 使い方

### 基本的な検索

1. **検索タイプ選択**: 楽曲名またはアーティスト名を選択
2. **キーワード入力**: 検索したい楽曲名やアーティスト名を入力
3. **マッチタイプ**: 前方一致または部分一致を選択
4. **シリアル番号**: 特定のカラオケ機種でフィルター（オプション）
5. **検索実行**: 検索ボタンをクリック

### クイック検索

右側のパネルから以下の検索が可能：

- 🌟 **新しいアニメ楽曲** - 最新のアニメ関連楽曲
- 💙 **VOCALOID楽曲** - 初音ミクなどのVOCALOID楽曲
- 👥 **デュエット楽曲** - 二人で歌えるデュエット楽曲

### 楽曲情報の見方

各楽曲カードには以下の情報が表示されます：

- **楽曲名** - 楽曲のタイトル
- **アーティスト名** - 歌手・グループ名
- **長さ** - 楽曲の長さ（MM:SS形式）
- **楽曲ID** - ClubDAM内での楽曲識別番号
- **番組名** - アニメ・ドラマ等の作品名（該当する場合）
- **歌詞の一部** - 楽曲の出だし部分
- **機能** - 採点機能・録音機能の対応状況
- **配信日** - 楽曲の配信開始日

## 📁 プロジェクト構造

```
├── app/
│   ├── api/                 # API ルート
│   │   ├── search/         # 楽曲検索API
│   │   └── check-exist/    # 楽曲存在確認API
│   ├── globals.css         # グローバルスタイル
│   ├── layout.tsx          # ルートレイアウト
│   └── page.tsx            # メインページ
├── components/
│   ├── ui/                 # Shadcn/ui コンポーネント
│   ├── search-results.tsx  # 検索結果表示
│   └── song-card.tsx       # 楽曲カード
├── lib/
│   └── utils.ts            # ユーティリティ関数
└── README.md
```

## 🔧 API エンドポイント

### POST /api/search

楽曲・アーティスト・カテゴリ検索

**リクエスト例（楽曲検索）:**
```json
{
  "searchType": "song",
  "searchQuery": "春よ、来い",
  "matchType": "1",
  "serialNo": "AB316238"
}
```

**リクエスト例（カテゴリ検索）:**
```json
{
  "searchType": "category",
  "categoryCd": "030301",
  "serialNo": "AB316238"
}
```

**レスポンス例:**
```json
{
  "searchResult": [
    {
      "reqNo": "123456",
      "songName": "春よ、来い",
      "artistName": "松任谷由実",
      "durationSeconds": 245,
      "durationFormatted": "4:05"
    }
  ],
  "totalCount": "1",
  "totalPage": "1"
}
```

### POST /api/check-exist

楽曲存在確認（将来の拡張用）

## 🎨 カスタマイズ

### テーマの変更

`app/globals.css`でCSS変数を変更することで、ダークモード・ライトモードのカラーをカスタマイズできます。

### コンポーネントの追加

新しいUIコンポーネントは`components/ui/`に、ページ固有のコンポーネントは`components/`に追加してください。

## 🔍 トラブルシューティング

### よくある問題

**1. API接続エラー**
- インターネット接続を確認
- ファイアウォール設定を確認
- ブラウザの開発者ツールでネットワークエラーを確認

**2. 検索結果が表示されない**
- 検索キーワードを変更してみる
- マッチタイプを「部分一致」に変更
- シリアル番号を空にして再検索

**3. ビルドエラー**
- Node.jsのバージョンが18.17以上か確認
- `node_modules`を削除して再インストール

```bash
rm -rf node_modules package-lock.json
npm install
```

## 📝 開発について

### 開発に貢献する

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチをプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

### 使用技術

- **フレームワーク**: Next.js 14
- **UI**: React 18
- **スタイリング**: Tailwind CSS
- **コンポーネント**: Shadcn/ui + Radix UI
- **言語**: TypeScript
- **アイコン**: Lucide React

## ⚠️ 注意事項

- このツールはClubDAMの非公開APIを使用しています
- 教育・研究目的での使用を推奨します
- APIの利用状況によっては制限がかかる可能性があります
- 楽曲の長さは推定値（ランダム生成）を使用しています

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

---

**楽しいカラオケライフを！🎤✨**