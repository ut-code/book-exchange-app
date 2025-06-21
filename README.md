# Book Exchange App - Beta Repository

本の交換を促進するプラットフォームです。ユーザー同士が本を交換・貸し借りし、読書コミュニティを構築できます。

## 機能概要

- 📚 本の登録・管理（ISBNからの自動取得対応）
- 👥 ユーザー間の本の交換・貸し借り
- 💬 リアルタイムチャット機能
- ⭐ 交換レビュー・信頼スコアシステム
- 🏆 実績バッジ・ゲーミフィケーション
- 📍 位置情報ベースのマッチング
- 🔍 本の検索・フィルタリング

## 技術スタック

### Backend
- NestJS + GraphQL (Apollo Server)
- Prisma ORM
- PostgreSQL
- TypeScript
- JWT認証

### Frontend  
- Next.js 13
- Apollo Client
- Material UI
- TypeScript
- GraphQL Code Generator

## セットアップ手順

### 前提条件
- Node.js 18以上
- Docker Desktop
- npm または yarn

### 1. リポジトリのクローン
```bash
git clone [repository-url]
cd book-exchange-app
npm install
```

### 2. 環境変数の設定
`packages/server/.env`ファイルが自動で作成されていることを確認してください。
必要に応じて以下の値を更新：
```env
DATABASE_URL="postgresql://postgres_beta_user:postgres_beta_password@localhost:48834/book_exchange_app_beta"
JWT_SECRET='your-secret-key'
SALT=10
```

### 3. データベースの起動
```bash
docker compose up
```

### 4. データベースのセットアップ
```bash
cd packages/server
npx prisma db push
npx prisma db seed
```

### 5. 開発サーバーの起動

**Backend:**
```bash
cd packages/server
npm run dev
```

**Frontend:**
```bash
cd packages/web  
npm run dev
```

## アクセスURL

| サービス | URL |
|---------|-----|
| Frontend | http://localhost:3003 |
| GraphQL Playground | http://localhost:4002/graphql |
| Prisma Studio | http://localhost:5557 |

## 開発ツール

### Prisma Studio（データベース管理UI）
```bash
cd packages/server
npm run prisma:studio
```

### Storybook（コンポーネントカタログ）
```bash
cd packages/web
npm run storybook
```

### コード生成
GraphQLスキーマからTypeScriptの型を自動生成：
```bash
cd packages/web
npm run generate
```

## ポート設定

このプロジェクトは複数のリポジトリ（Alpha/Beta）での並行開発に対応しています。

### Beta Repository（このリポジトリ）ポート設定

| サービス | ポート | 説明 |
|---------|--------|------|
| **GraphQL Server** | 4002 | NestJS/Apollo Server |
| **Web Frontend** | 3003 | Next.js開発サーバー |
| **PostgreSQL** | 48834 | Dockerコンテナ |
| **Prisma Studio** | 5557 | データベース管理UI |
| **Storybook** | 6007 | コンポーネントライブラリ |

### データベース接続情報

| 項目 | 値 |
|------|-----|
| **データベース名** | book_exchange_app_beta |
| **ユーザー名** | postgres_beta_user |
| **パスワード** | postgres_beta_password |
| **ホスト** | localhost |
| **ポート** | 48834 |

## 主要なコマンド

### Server側
```bash
cd packages/server

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# テスト実行
npm run test
npm run test:cov  # カバレッジ付き

# 型チェック
npm run typecheck

# Lint
npm run lint
npm run lint:fix

# Prisma関連
npm run prisma:generate  # クライアント生成
npm run prisma:migrate   # マイグレーション実行
npm run prisma:studio    # Studio起動
```

### Web側
```bash
cd packages/web

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 型チェック
npm run typecheck

# Lint
npm run lint
npm run lint:fix

# GraphQL型生成
npm run generate
```

## プロジェクト構成

```
book-exchange-app/
├── packages/
│   ├── server/          # Backend (NestJS)
│   │   ├── src/
│   │   │   ├── models/      # GraphQLモデル定義
│   │   │   ├── resolvers/   # GraphQLリゾルバー
│   │   │   ├── services/    # ビジネスロジック
│   │   │   └── main.ts      # エントリーポイント
│   │   └── prisma/
│   │       ├── schema.prisma # データベーススキーマ
│   │       └── seed.ts       # シードデータ
│   └── web/            # Frontend (Next.js)
│       ├── src/
│       │   ├── pages/       # ページコンポーネント
│       │   ├── components/  # 共通コンポーネント
│       │   └── graphqlTypes.ts # 自動生成された型
│       └── codegen.ts      # GraphQL Code Generator設定
├── docker-compose.yml   # Docker設定
├── schema.graphql      # GraphQLスキーマ
└── README.md          # このファイル
```

## トラブルシューティング

### データベース接続エラー
```bash
# Dockerコンテナが起動しているか確認
docker ps

# コンテナを再起動
docker compose down
docker compose up -d
```

### Prisma Studio接続エラー
```bash
# Prismaクライアントを再生成
cd packages/server
npx prisma generate
```

### ポート競合エラー・ゾンビプロセス
開発サーバーがゾンビ化してポート4002が使用中の場合：

```bash
# ゾンビプロセスを終了して再起動
cd packages/server
npm run dev:clean

# または手動で終了
npm run dev:kill
npm run dev
```

ゾンビ化を防ぐため、main.tsにグレースフルシャットダウンが実装されています。

## 開発フロー

1. **機能開発**
   - `packages/server/prisma/schema.prisma`でモデル定義
   - `packages/server/src/resolvers/`でGraphQLリゾルバー実装
   - `packages/web/src/pages/`でUI実装

2. **スキーマ変更時**
   ```bash
   # Server側
   cd packages/server
   npx prisma db push
   
   # Web側
   cd packages/web
   npm run generate
   ```

3. **テスト**
   - 単体テスト: `npm run test`
   - カバレッジ確認: `npm run test:cov`

## ライセンス

UNLICENSED