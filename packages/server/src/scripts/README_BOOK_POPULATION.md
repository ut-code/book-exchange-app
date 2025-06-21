# Book Database Population Script

## 概要

このスクリプトは、Google Books APIを使用してBookTemplateテーブルに大量の本データを自動で追加するためのツールです。様々な検索手法を組み合わせて、日本語の人気書籍を効率的にデータベースに蓄積できます。

## 機能

### 🎯 主要機能

1. **人気ISBNからの一括追加**
   - 事前に厳選された人気書籍のISBNリストから本情報を取得
   - 小説、ビジネス書、技術書、漫画など幅広いジャンルをカバー

2. **カテゴリベースの検索**
   - 10の主要カテゴリから体系的に本を収集
   - 日本文学、ミステリー、ビジネス・自己啓発、技術書など

3. **ベストセラー検索**
   - 話題の書籍や人気作品を動的に検索
   - 新刊や評価の高い書籍を自動発見

4. **重複排除とエラーハンドリング**
   - ISBN/タイトルベースの重複チェック
   - API制限やネットワークエラーに対する堅牢な処理

5. **詳細な統計とログ**
   - リアルタイムでの進捗表示
   - 成功率、エラー率、API使用状況の統計

### 📊 対象カテゴリ

| カテゴリ | 日本語名 | 期待追加数 | 優先度 |
|---------|---------|-----------|-------|
| japanese-literature | 日本文学 | 100冊 | 1 |
| mystery-thriller | ミステリー・スリラー | 80冊 | 2 |
| business-self-help | ビジネス・自己啓発 | 120冊 | 3 |
| technology-programming | 技術・プログラミング | 100冊 | 4 |
| manga-light-novel | 漫画・ライトノベル | 150冊 | 5 |
| science-education | 科学・教育 | 70冊 | 6 |
| health-cooking | 健康・料理 | 60冊 | 7 |
| travel-hobby | 旅行・趣味 | 50冊 | 8 |
| philosophy-psychology | 哲学・心理学 | 40冊 | 9 |
| history-biography | 歴史・伝記 | 60冊 | 10 |

## 使用方法

### 基本実行

```bash
# サーバーディレクトリに移動
cd packages/server

# スクリプト実行
npx ts-node src/scripts/populate-book-database.ts
```

### 設定のカスタマイズ

`src/scripts/populate-book-database.ts`の`main()`関数内で設定を調整できます：

```typescript
const config: PopulationConfig = {
  maxBooksPerCategory: 10,    // カテゴリごとの最大追加数
  delayBetweenRequests: 200,  // リクエスト間隔（ms）
  maxRetries: 2,              // 最大リトライ回数
  startIndex: 0,              // 検索開始位置
  batchSize: 5,               // バッチサイズ
};
```

## ファイル構成

```
src/scripts/
├── populate-book-database.ts          # メインスクリプト
├── book-data-sources.ts              # データソース定義
└── README_BOOK_POPULATION.md         # このドキュメント

src/services/google-books/
├── google-books.service.ts           # 基本Google Books API
└── enhanced-google-books.service.ts  # 拡張検索機能
```

### ファイル詳細

#### `populate-book-database.ts`
- **BookDatabasePopulator**: メインクラス
- **PopulationConfig**: 設定インターフェース
- **PopulationStats**: 実行統計

#### `book-data-sources.ts`
- **BOOK_CATEGORIES**: カテゴリ定義
- **POPULAR_JAPANESE_ISBNS**: 人気書籍ISBNリスト
- **BESTSELLER_QUERIES**: ベストセラー検索クエリ

#### `enhanced-google-books.service.ts`
- **EnhancedGoogleBooksService**: 高度な検索機能
- **ExtendedBookInfo**: 拡張書籍情報
- **SearchStats**: API使用統計

## 実行例

### 成功例

```
🚀 Book Database 大量追加スクリプト開始
📊 設定:
   - カテゴリごとの最大追加数: 10
   - リクエスト間隔: 200ms
   - バッチサイズ: 5
   - 最大リトライ: 2

📖 人気ISBN リストから本を追加中...
✨ 追加: ノルウェイの森 (9784167158057)
✨ 追加: 容疑者Xの献身 (9784062639378)
📚 既存: こころ (9784101001616)

🎯 カテゴリベースの検索で本を追加中...
📂 カテゴリ: 日本文学 (japanese-literature)
  🔍 検索中: "subject:fiction+inauthor:村上春樹"
  ✅ 検索結果: 12件取得
  ✨ 追加: 海辺のカフカ (9784167305024)
  📚 既存: ノルウェイの森 (9784167158057)

📊 ===== 最終結果 =====
⏱️  実行時間: 3分45秒
🎯 試行総数: 250
✅ 追加成功: 180
⏭️  重複スキップ: 45
❌ エラー: 25
📈 成功率: 72.0%
========================
```

## エラーハンドリング

### よくあるエラーと対処法

1. **レート制限エラー**
   - 症状: `Rate limit exceeded`
   - 対処: `delayBetweenRequests`を増加（500ms以上推奨）

2. **ネットワークエラー**
   - 症状: `Network error - Cannot connect`
   - 対処: インターネット接続を確認

3. **データベース接続エラー**
   - 症状: `Database connection failed`
   - 対処: PostgreSQLサーバーが起動していることを確認

4. **ISBN形式エラー**
   - 症状: `Invalid ISBN format`
   - 対処: ISBNリストの形式を確認（ハイフンなしの10桁または13桁）

### 中断時の再開

スクリプトは既存データをチェックするため、中断後も安全に再実行できます。既に存在する書籍はスキップされます。

## パフォーマンス最適化

### 推奨設定

| 目的 | maxBooksPerCategory | delayBetweenRequests | 備考 |
|------|-------------------|---------------------|------|
| 高速テスト | 5 | 100ms | 開発・テスト用 |
| 標準運用 | 15 | 200ms | 本番推奨 |
| 安全運用 | 25 | 500ms | API制限回避 |
| 大量取得 | 50 | 1000ms | 夜間バッチ処理 |

### API制限について

Google Books APIの制限：
- **無料枠**: 1日1,000リクエスト
- **レート制限**: 100リクエスト/100秒
- **推奨間隔**: 200ms以上

## データ品質

### 収集データの特徴

- **言語**: 主に日本語（一部英語含む）
- **ジャンル**: 小説、ビジネス書、技術書、漫画、学術書
- **品質**: ISBN付きの正規出版物のみ
- **完全性**: タイトル・著者は必須、その他は可能な限り

### データ検証

- ISBN形式の検証（10桁または13桁）
- 重複排除（ISBN + タイトル）
- 最低限情報の確認（タイトル必須）

## トラブルシューティング

### デバッグ情報の確認

1. **統計情報**
   ```
   📊 === Google Books API 使用統計 ===
   🔍 総検索回数: 150
   ✅ 成功: 130
   ❌ 失敗: 20
   📚 取得した本の総数: 180
   🌐 API呼び出し回数: 150
   ⏱️  レート制限ヒット: 2
   📈 成功率: 86.7%
   ```

2. **ログファイル**
   - コンソールに詳細ログを出力
   - エラー発生時には原因と対処法を表示

### 設定調整のガイドライン

- エラー率が30%を超える場合：`delayBetweenRequests`を増加
- 重複が多い場合：データベースをクリアしてから実行
- 取得数が少ない場合：`maxBooksPerCategory`を増加

## API KEY設定（オプション）

Google Books APIにAPIキーを設定する場合：

```bash
# 環境変数設定
export GOOGLE_BOOKS_API_KEY="your_api_key_here"
```

注意：現在は無料枠で動作するため、APIキーは必須ではありません。

## 注意事項

1. **利用規約の遵守**
   - Google Books APIの利用規約を確認してください
   - 商用利用の場合は適切なライセンスを取得してください

2. **データベースバックアップ**
   - 大量データ追加前にデータベースをバックアップしてください

3. **ディスク容量**
   - 画像URLや説明文により、データサイズが大きくなる場合があります

4. **ネットワーク使用量**
   - 大量のAPIリクエストによりネットワーク使用量が増加します

## ライセンス

このスクリプトはMITライセンスの下で提供されます。Google Books APIから取得されるデータは、それぞれの著作権者に帰属します。