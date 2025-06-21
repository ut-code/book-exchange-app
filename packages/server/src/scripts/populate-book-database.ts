import { PrismaService } from '../services/prisma/prisma.service';
import { GoogleBooksService } from '../services/google-books/google-books.service';
import { BookDatabaseService } from '../services/book-database/book-database.service';
import { EnhancedGoogleBooksService, ExtendedBookInfo } from '../services/google-books/enhanced-google-books.service';
import { BOOK_CATEGORIES, POPULAR_JAPANESE_ISBNS, BESTSELLER_QUERIES, getPublisherQueries } from './book-data-sources';
import { randomUUID } from 'crypto';

interface PopulationConfig {
  maxBooksPerCategory: number;
  delayBetweenRequests: number;
  maxRetries: number;
  startIndex: number;
  batchSize: number;
}

interface PopulationStats {
  totalAttempted: number;
  successfullyAdded: number;
  skippedDuplicates: number;
  errors: number;
  startTime: Date;
  endTime?: Date;
}

class BookDatabasePopulator {
  private prisma: PrismaService;
  private googleBooksService: GoogleBooksService;
  private enhancedGoogleBooksService: EnhancedGoogleBooksService;
  private bookDatabaseService: BookDatabaseService;
  private stats: PopulationStats;

  constructor() {
    this.prisma = new PrismaService();
    this.googleBooksService = new GoogleBooksService();
    this.enhancedGoogleBooksService = new EnhancedGoogleBooksService();
    this.bookDatabaseService = new BookDatabaseService(this.prisma, this.googleBooksService);
    this.stats = {
      totalAttempted: 0,
      successfullyAdded: 0,
      skippedDuplicates: 0,
      errors: 0,
      startTime: new Date(),
    };
  }

  /**
   * ExtendedBookInfoをBookTemplateデータに変換
   */
  private bookInfoToTemplateData(book: ExtendedBookInfo) {
    const isbn = book.isbn13 || book.isbn10;
    if (!isbn) return null;

    return {
      isbn: isbn.replace(/[-\s]/g, ''),
      title: book.title,
      author: book.authors?.join(', ') || null,
      publisher: book.publisher || null,
      publishedDate: book.publishedDate || null,
      pageCount: book.pageCount || null,
      language: book.language || 'ja',
      categories: book.categories || [],
      imageUrl: book.imageLinks?.thumbnail || null,
      infoLink: book.infoLink || null,
      description: book.description || '',
    };
  }

  /**
   * 検索クエリからGoogle Books APIで本を検索
   */
  private async searchBooksByQuery(
    query: string, 
    maxResults: number = 40,
    startIndex: number = 0
  ): Promise<any[]> {
    try {
      console.log(`🔍 検索中: "${query}" (開始位置: ${startIndex})`);
      
      // Google Books APIの直接呼び出し
      const axios = require('axios');
      const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
        params: {
          q: query,
          maxResults: Math.min(maxResults, 40), // APIの制限
          startIndex: startIndex,
          langRestrict: 'ja', // 日本語の本を優先
          printType: 'books',
          projection: 'full'
        },
        timeout: 15000,
        headers: {
          'User-Agent': 'BookExchangeApp/1.0'
        }
      });

      if (response.data.totalItems === 0 || !response.data.items) {
        console.log(`  ⚠️ "${query}" で結果が見つかりませんでした`);
        return [];
      }

      console.log(`  ✅ "${query}" で ${response.data.items.length} 件の結果を取得`);
      return response.data.items;
    } catch (error) {
      console.error(`  ❌ "${query}" の検索でエラー:`, error.message);
      this.stats.errors++;
      return [];
    }
  }

  /**
   * Google Books APIの結果をBookTemplateに変換
   */
  private async processBookItem(item: any): Promise<boolean> {
    try {
      const volumeInfo = item.volumeInfo;
      
      // 必要な情報がない場合はスキップ
      if (!volumeInfo.title) {
        return false;
      }

      // ISBNを取得
      let isbn = null;
      if (volumeInfo.industryIdentifiers) {
        for (const identifier of volumeInfo.industryIdentifiers) {
          if (identifier.type === 'ISBN_13' || identifier.type === 'ISBN_10') {
            isbn = identifier.identifier.replace(/[-\s]/g, '');
            break;
          }
        }
      }

      // ISBNがない場合はスキップ
      if (!isbn) {
        return false;
      }

      // 既存チェック
      const existing = await this.prisma.bookTemplate.findUnique({
        where: { isbn }
      });

      if (existing) {
        console.log(`  📚 既存: ${volumeInfo.title} (${isbn})`);
        this.stats.skippedDuplicates++;
        return false;
      }

      // BookTemplateを作成
      const bookTemplate = await this.prisma.bookTemplate.create({
        data: {
          id: randomUUID(),
          isbn: isbn,
          title: volumeInfo.title,
          author: volumeInfo.authors?.join(', ') || null,
          publisher: volumeInfo.publisher || null,
          publishedDate: volumeInfo.publishedDate || null,
          pageCount: volumeInfo.pageCount || null,
          language: volumeInfo.language || 'ja',
          categories: volumeInfo.categories || [],
          imageUrl: volumeInfo.imageLinks?.thumbnail || null,
          infoLink: volumeInfo.infoLink || null,
          description: volumeInfo.description || '',
        },
      });

      console.log(`  ✨ 追加: ${bookTemplate.title} (${isbn})`);
      this.stats.successfullyAdded++;
      return true;
    } catch (error) {
      console.error(`  ❌ 処理エラー:`, error.message);
      this.stats.errors++;
      return false;
    }
  }

  /**
   * 人気ISBNリストから本を追加
   */
  private async populateFromISBNList(config: PopulationConfig): Promise<void> {
    console.log(`\n📖 人気ISBN リストから本を追加中...`);
    
    const isbnList = POPULAR_JAPANESE_ISBNS;
    
    for (const isbn of isbnList) {
      try {
        this.stats.totalAttempted++;
        
        // 既存チェック
        const existing = await this.prisma.bookTemplate.findUnique({
          where: { isbn }
        });

        if (existing) {
          console.log(`📚 既存: ${existing.title} (${isbn})`);
          this.stats.skippedDuplicates++;
          continue;
        }

        // Google Books APIで詳細取得
        const bookInfo = await this.googleBooksService.searchByIsbn(isbn);
        
        if (!bookInfo) {
          console.log(`⚠️ 見つからない: ${isbn}`);
          this.stats.errors++;
          continue;
        }

        // BookTemplateを作成
        const bookTemplate = await this.prisma.bookTemplate.create({
          data: {
            id: randomUUID(),
            isbn: isbn,
            title: bookInfo.title,
            author: bookInfo.authors?.join(', ') || null,
            publisher: bookInfo.publisher || null,
            publishedDate: bookInfo.publishedDate || null,
            pageCount: bookInfo.pageCount || null,
            language: bookInfo.language || 'ja',
            categories: bookInfo.categories || [],
            imageUrl: bookInfo.imageLinks?.thumbnail || null,
            infoLink: bookInfo.infoLink || null,
            description: bookInfo.description || '',
          },
        });

        console.log(`✨ 追加: ${bookTemplate.title} (${isbn})`);
        this.stats.successfullyAdded++;

        // レート制限対応
        await this.delay(config.delayBetweenRequests);
      } catch (error) {
        console.error(`❌ ISBN ${isbn} の処理でエラー:`, error.message);
        this.stats.errors++;
      }
    }
  }

  /**
   * カテゴリベースの検索で本を追加
   */
  private async populateFromCategories(config: PopulationConfig): Promise<void> {
    console.log(`\n🎯 カテゴリベースの検索で本を追加中...`);
    
    const categories = BOOK_CATEGORIES.slice(0, 3); // 最初の3カテゴリに限定
    
    for (const category of categories) {
      try {
        console.log(`\n📂 カテゴリ: ${category.japaneseName} (${category.name})`);
        
        const books = await this.enhancedGoogleBooksService.searchByCategory(category, config.maxBooksPerCategory);
        
        let addedCount = 0;
        for (const book of books) {
          this.stats.totalAttempted++;
          
          const templateData = this.bookInfoToTemplateData(book);
          if (!templateData) {
            this.stats.errors++;
            continue;
          }

          // 既存チェック
          const existing = await this.prisma.bookTemplate.findUnique({
            where: { isbn: templateData.isbn }
          });

          if (existing) {
            console.log(`  📚 既存: ${templateData.title} (${templateData.isbn})`);
            this.stats.skippedDuplicates++;
            continue;
          }

          try {
            // BookTemplateを作成
            const bookTemplate = await this.prisma.bookTemplate.create({
              data: {
                id: randomUUID(),
                ...templateData,
              },
            });

            console.log(`  ✨ 追加: ${bookTemplate.title} (${templateData.isbn})`);
            this.stats.successfullyAdded++;
            addedCount++;

            // レート制限対応
            await this.delay(config.delayBetweenRequests);
          } catch (error) {
            console.error(`  ❌ DB追加エラー:`, error.message);
            this.stats.errors++;
          }
        }

        console.log(`📊 カテゴリ "${category.japaneseName}": ${addedCount}冊追加`);
      } catch (error) {
        console.error(`❌ カテゴリ "${category.name}" でエラー:`, error.message);
        this.stats.errors++;
      }
    }
  }

  /**
   * ベストセラークエリから本を追加
   */
  private async populateFromBestsellerQueries(config: PopulationConfig): Promise<void> {
    console.log(`\n🏆 ベストセラークエリから本を追加中...`);
    
    for (const query of BESTSELLER_QUERIES) {
      try {
        console.log(`\n🔍 ベストセラー検索: "${query}"`);
        
        const searchQuery = {
          type: 'keyword' as const,
          value: query,
          language: 'ja',
          maxResults: config.maxBooksPerCategory,
        };

        const result = await this.enhancedGoogleBooksService.advancedSearch(searchQuery);
        
        let addedCount = 0;
        for (const book of result.books) {
          this.stats.totalAttempted++;
          
          const templateData = this.bookInfoToTemplateData(book);
          if (!templateData) {
            this.stats.errors++;
            continue;
          }

          // 既存チェック
          const existing = await this.prisma.bookTemplate.findUnique({
            where: { isbn: templateData.isbn }
          });

          if (existing) {
            console.log(`  📚 既存: ${templateData.title} (${templateData.isbn})`);
            this.stats.skippedDuplicates++;
            continue;
          }

          try {
            // BookTemplateを作成
            const bookTemplate = await this.prisma.bookTemplate.create({
              data: {
                id: randomUUID(),
                ...templateData,
              },
            });

            console.log(`  ✨ 追加: ${bookTemplate.title} (${templateData.isbn})`);
            this.stats.successfullyAdded++;
            addedCount++;

            if (addedCount >= config.maxBooksPerCategory) {
              break;
            }

            // レート制限対応
            await this.delay(config.delayBetweenRequests);
          } catch (error) {
            console.error(`  ❌ DB追加エラー:`, error.message);
            this.stats.errors++;
          }
        }

        console.log(`📊 ベストセラー検索 "${query}": ${addedCount}冊追加`);
      } catch (error) {
        console.error(`❌ ベストセラー検索 "${query}" でエラー:`, error.message);
        this.stats.errors++;
      }
    }
  }

  /**
   * メイン実行関数
   */
  async populate(config: PopulationConfig): Promise<void> {
    console.log(`🚀 Book Database 大量追加スクリプト開始`);
    console.log(`📊 設定:`);
    console.log(`   - カテゴリごとの最大追加数: ${config.maxBooksPerCategory}`);
    console.log(`   - リクエスト間隔: ${config.delayBetweenRequests}ms`);
    console.log(`   - バッチサイズ: ${config.batchSize}`);
    console.log(`   - 最大リトライ: ${config.maxRetries}`);

    try {
      // 1. 人気ISBNリストから追加
      await this.populateFromISBNList(config);

      // 2. カテゴリベースの検索で追加
      await this.populateFromCategories(config);

      // 3. ベストセラークエリから追加
      await this.populateFromBestsellerQueries(config);

      this.stats.endTime = new Date();
      this.printFinalStats();
      this.enhancedGoogleBooksService.printStats();

    } catch (error) {
      console.error(`💥 致命的エラー:`, error);
      throw error;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  /**
   * 最終統計を表示
   */
  private printFinalStats(): void {
    const duration = this.stats.endTime!.getTime() - this.stats.startTime.getTime();
    const durationMinutes = Math.floor(duration / 60000);
    const durationSeconds = Math.floor((duration % 60000) / 1000);

    console.log(`\n📊 ===== 最終結果 =====`);
    console.log(`⏱️  実行時間: ${durationMinutes}分${durationSeconds}秒`);
    console.log(`🎯 試行総数: ${this.stats.totalAttempted}`);
    console.log(`✅ 追加成功: ${this.stats.successfullyAdded}`);
    console.log(`⏭️  重複スキップ: ${this.stats.skippedDuplicates}`);
    console.log(`❌ エラー: ${this.stats.errors}`);
    console.log(`📈 成功率: ${(this.stats.successfullyAdded / this.stats.totalAttempted * 100).toFixed(1)}%`);
    console.log(`========================`);
  }

  /**
   * 遅延関数
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * スクリプト実行
 */
async function main() {
  const config: PopulationConfig = {
    maxBooksPerCategory: 10, // カテゴリごとの最大追加数（小さく）
    delayBetweenRequests: 200, // 200ms間隔（高速化）
    maxRetries: 2,
    startIndex: 0,
    batchSize: 5,
  };

  const populator = new BookDatabasePopulator();
  
  try {
    await populator.populate(config);
    console.log(`✅ 大量データ追加が完了しました！`);
  } catch (error) {
    console.error(`💥 スクリプト実行に失敗:`, error);
    process.exit(1);
  }
}

// 直接実行時にメイン関数を呼び出し
if (require.main === module) {
  main().catch(console.error);
}

export { BookDatabasePopulator, PopulationConfig, PopulationStats };