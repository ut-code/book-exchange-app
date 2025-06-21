import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { GoogleBookInfo, GoogleBooksApiResponse } from './google-books.service';
import { BookSearchQuery, BookCategory } from '../../scripts/book-data-sources';

export interface ExtendedBookInfo extends GoogleBookInfo {
  isbn10?: string;
  isbn13?: string;
  averageRating?: number;
  ratingsCount?: number;
  previewLink?: string;
  canonicalVolumeLink?: string;
}

export interface SearchResult {
  books: ExtendedBookInfo[];
  totalResults: number;
  hasMore: boolean;
  nextStartIndex?: number;
}

export interface SearchStats {
  totalSearches: number;
  successfulSearches: number;
  failedSearches: number;
  totalBooksFound: number;
  duplicatesSkipped: number;
  apiCallsUsed: number;
  rateLimitHits: number;
}

@Injectable()
export class EnhancedGoogleBooksService {
  private readonly baseUrl = 'https://www.googleapis.com/books/v1/volumes';
  private stats: SearchStats;
  private lastRequestTime: number = 0;
  private readonly minRequestInterval = 100; // 100ms between requests

  constructor() {
    this.stats = {
      totalSearches: 0,
      successfulSearches: 0,
      failedSearches: 0,
      totalBooksFound: 0,
      duplicatesSkipped: 0,
      apiCallsUsed: 0,
      rateLimitHits: 0,
    };
  }

  /**
   * レート制限を考慮したリクエスト
   */
  private async rateLimitedRequest(): Promise<void> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    
    if (timeSinceLastRequest < this.minRequestInterval) {
      const waitTime = this.minRequestInterval - timeSinceLastRequest;
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    
    this.lastRequestTime = Date.now();
  }

  /**
   * 高度な検索機能
   */
  async advancedSearch(query: BookSearchQuery): Promise<SearchResult> {
    await this.rateLimitedRequest();
    this.stats.totalSearches++;
    this.stats.apiCallsUsed++;

    try {
      const searchParams = this.buildSearchParams(query);
      
      console.log(`🔍 Advanced Search: ${JSON.stringify(searchParams)}`);
      
      const response = await axios.get<GoogleBooksApiResponse>(this.baseUrl, {
        params: searchParams,
        timeout: 15000,
        headers: {
          'User-Agent': 'BookExchangeApp/2.0',
          'Accept': 'application/json',
          'Accept-Encoding': 'gzip, deflate',
        }
      });

      if (response.data.totalItems === 0 || !response.data.items) {
        this.stats.successfulSearches++;
        return {
          books: [],
          totalResults: 0,
          hasMore: false,
        };
      }

      const books = response.data.items.map(item => this.enhanceBookInfo(item.volumeInfo));
      this.stats.successfulSearches++;
      this.stats.totalBooksFound += books.length;

      return {
        books,
        totalResults: response.data.totalItems,
        hasMore: response.data.totalItems > (query.startIndex || 0) + books.length,
        nextStartIndex: (query.startIndex || 0) + books.length,
      };

    } catch (error) {
      this.stats.failedSearches++;
      
      if (error.response?.status === 429) {
        this.stats.rateLimitHits++;
        console.warn(`⚠️ Rate limit hit, waiting 60 seconds...`);
        await new Promise(resolve => setTimeout(resolve, 60000));
        throw new Error('Rate limit exceeded, waiting period applied');
      }
      
      console.error(`❌ Advanced search failed:`, error.message);
      throw error;
    }
  }

  /**
   * 検索パラメータの構築
   */
  private buildSearchParams(query: BookSearchQuery): any {
    const params: any = {
      q: query.value,
      maxResults: Math.min(query.maxResults || 40, 40),
      startIndex: query.startIndex || 0,
      printType: 'books',
      projection: 'full',
    };

    if (query.language) {
      params.langRestrict = query.language;
    }

    // 検索タイプに応じた最適化
    switch (query.type) {
      case 'isbn':
        params.q = `isbn:${query.value.replace(/[-\s]/g, '')}`;
        break;
      case 'title':
        params.q = `intitle:${query.value}`;
        break;
      case 'author':
        params.q = `inauthor:${query.value}`;
        break;
      case 'subject':
        params.q = `subject:${query.value}`;
        break;
      case 'keyword':
        // そのまま使用
        break;
    }

    return params;
  }

  /**
   * 本の情報を拡張
   */
  private enhanceBookInfo(volumeInfo: GoogleBookInfo): ExtendedBookInfo {
    const enhanced: ExtendedBookInfo = {
      ...volumeInfo,
      averageRating: (volumeInfo as any).averageRating,
      ratingsCount: (volumeInfo as any).ratingsCount,
      previewLink: (volumeInfo as any).previewLink,
      canonicalVolumeLink: (volumeInfo as any).canonicalVolumeLink,
    };

    // ISBNの分離
    if (volumeInfo.industryIdentifiers) {
      for (const identifier of volumeInfo.industryIdentifiers) {
        if (identifier.type === 'ISBN_10') {
          enhanced.isbn10 = identifier.identifier;
        } else if (identifier.type === 'ISBN_13') {
          enhanced.isbn13 = identifier.identifier;
        }
      }
    }

    return enhanced;
  }

  /**
   * カテゴリベースの一括検索
   */
  async searchByCategory(category: BookCategory, maxPerQuery: number = 20): Promise<ExtendedBookInfo[]> {
    console.log(`🎯 Category Search: ${category.japaneseName} (${category.name})`);
    
    const allBooks: ExtendedBookInfo[] = [];
    const seenISBNs = new Set<string>();

    for (const queryString of category.searchQueries) {
      try {
        const query: BookSearchQuery = {
          type: 'keyword',
          value: queryString,
          language: 'ja',
          maxResults: maxPerQuery,
        };

        const result = await this.advancedSearch(query);
        
        // 重複を除去して追加
        for (const book of result.books) {
          const isbn = book.isbn13 || book.isbn10;
          if (isbn && !seenISBNs.has(isbn)) {
            seenISBNs.add(isbn);
            allBooks.push(book);
          } else if (!isbn) {
            // ISBNがなくてもタイトル+著者で重複チェック
            const key = `${book.title}:${book.authors?.join(',')}`;
            if (!seenISBNs.has(key)) {
              seenISBNs.add(key);
              allBooks.push(book);
            }
          }
        }

        console.log(`  📚 Query "${queryString}": ${result.books.length} books found`);
        
        // カテゴリの期待数に達したら終了
        if (allBooks.length >= category.expectedCount) {
          break;
        }

      } catch (error) {
        console.error(`  ❌ Query failed: "${queryString}":`, error.message);
        continue;
      }
    }

    console.log(`  ✅ Category "${category.japaneseName}": ${allBooks.length} unique books collected`);
    return allBooks.slice(0, category.expectedCount);
  }

  /**
   * 複数カテゴリの並行検索
   */
  async searchMultipleCategories(
    categories: BookCategory[], 
    concurrency: number = 2
  ): Promise<Map<string, ExtendedBookInfo[]>> {
    const results = new Map<string, ExtendedBookInfo[]>();
    
    // カテゴリを優先順位でソート
    const sortedCategories = [...categories].sort((a, b) => a.priority - b.priority);
    
    // 並行処理（concurrency制御）
    for (let i = 0; i < sortedCategories.length; i += concurrency) {
      const batch = sortedCategories.slice(i, i + concurrency);
      
      const promises = batch.map(async (category) => {
        try {
          const books = await this.searchByCategory(category);
          results.set(category.name, books);
          return { category: category.name, count: books.length };
        } catch (error) {
          console.error(`❌ Category ${category.name} failed:`, error.message);
          results.set(category.name, []);
          return { category: category.name, count: 0 };
        }
      });

      const batchResults = await Promise.allSettled(promises);
      
      batchResults.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          console.log(`✅ Batch ${i + index + 1}: ${result.value.category} - ${result.value.count} books`);
        } else {
          console.error(`❌ Batch ${i + index + 1} failed:`, result.reason);
        }
      });

      // バッチ間で少し待機
      if (i + concurrency < sortedCategories.length) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    return results;
  }

  /**
   * 年代別ベストセラー検索
   */
  async searchBestsellersByEra(startYear: number, endYear: number, limit: number = 50): Promise<ExtendedBookInfo[]> {
    const query: BookSearchQuery = {
      type: 'keyword',
      value: `publishedDate:${startYear}..${endYear}+orderBy:relevance`,
      language: 'ja',
      maxResults: limit,
    };

    const result = await this.advancedSearch(query);
    return result.books;
  }

  /**
   * 高評価書籍の検索
   */
  async searchHighRatedBooks(minRating: number = 4.0, limit: number = 100): Promise<ExtendedBookInfo[]> {
    const books: ExtendedBookInfo[] = [];
    const queries = [
      'orderBy:relevance+subject:fiction',
      'orderBy:relevance+subject:business', 
      'orderBy:relevance+subject:self-help',
      'orderBy:relevance+subject:science',
    ];

    for (const queryString of queries) {
      const query: BookSearchQuery = {
        type: 'keyword',
        value: queryString,
        language: 'ja',
        maxResults: 40,
      };

      try {
        const result = await this.advancedSearch(query);
        const highRated = result.books.filter(book => 
          book.averageRating && book.averageRating >= minRating
        );
        books.push(...highRated);

        if (books.length >= limit) break;
      } catch (error) {
        console.error(`High-rated search failed for "${queryString}":`, error.message);
      }
    }

    return books.slice(0, limit);
  }

  /**
   * 統計情報の取得
   */
  getStats(): SearchStats {
    return { ...this.stats };
  }

  /**
   * 統計情報のリセット
   */
  resetStats(): void {
    this.stats = {
      totalSearches: 0,
      successfulSearches: 0,
      failedSearches: 0,
      totalBooksFound: 0,
      duplicatesSkipped: 0,
      apiCallsUsed: 0,
      rateLimitHits: 0,
    };
  }

  /**
   * 統計情報の表示
   */
  printStats(): void {
    console.log(`\n📊 === Google Books API 使用統計 ===`);
    console.log(`🔍 総検索回数: ${this.stats.totalSearches}`);
    console.log(`✅ 成功: ${this.stats.successfulSearches}`);
    console.log(`❌ 失敗: ${this.stats.failedSearches}`);
    console.log(`📚 取得した本の総数: ${this.stats.totalBooksFound}`);
    console.log(`⏭️  重複スキップ: ${this.stats.duplicatesSkipped}`);
    console.log(`🌐 API呼び出し回数: ${this.stats.apiCallsUsed}`);
    console.log(`⏱️  レート制限ヒット: ${this.stats.rateLimitHits}`);
    
    if (this.stats.totalSearches > 0) {
      const successRate = (this.stats.successfulSearches / this.stats.totalSearches * 100).toFixed(1);
      console.log(`📈 成功率: ${successRate}%`);
    }
    
    if (this.stats.successfulSearches > 0) {
      const avgBooksPerSearch = (this.stats.totalBooksFound / this.stats.successfulSearches).toFixed(1);
      console.log(`📖 検索あたりの平均取得数: ${avgBooksPerSearch}冊`);
    }
    console.log(`==================================\n`);
  }
}