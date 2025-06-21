import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GoogleBooksService } from '../google-books/google-books.service';
import { randomUUID } from 'crypto';

export interface BookMetadata {
  isbn: string;
  title: string;
  author?: string;
  publisher?: string;
  publishedDate?: string;
  pageCount?: number;
  language?: string;
  categories?: string[];
  imageUrl?: string;
  infoLink?: string;
  description?: string;
}

@Injectable()
export class BookDatabaseService {
  private readonly logger = new Logger(BookDatabaseService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly googleBooksService: GoogleBooksService,
  ) {}

  async populatePopularBooks(): Promise<void> {
    this.logger.log('Starting to populate book database with popular books...');

    // Popular Japanese books ISBNs
    const popularISBNs = [
      '9784101001135', // ノルウェイの森 - 村上春樹
      '9784087474731', // 君の名は。 - 新海誠
      '9784087711467', // 鬼滅の刃 1
      '9784088820583', // ワンピース 1
      '9784062138000', // 1Q84 - 村上春樹
      '9784103534228', // 容疑者Xの献身 - 東野圭吾
      '9784087451261', // 白夜行 - 東野圭吾
      '9784334768898', // 告白 - 湊かなえ
      '9784087450262', // 永遠の0 - 百田尚樹
      '9784047915756', // 君の膵臓をたべたい - 住野よる
      '9784087711474', // 鬼滅の刃 2
      '9784047914825', // また、同じ夢を見ていた - 住野よる
      '9784163900551', // 火花 - 又吉直樹
      '9784087711481', // 鬼滅の刃 3
      '9784088820606', // ワンピース 2
      '9784087809404', // 流浪の月 - 凪良ゆう
      '9784167307028', // 夜は短し歩けよ乙女 - 森見登美彦
      '9784041026403', // 本好きの下剋上 1
      '9784041036224', // リゼロ 1
      '9784049135519', // 転生したらスライムだった件 1
      '9784088820620', // ワンピース 3
      '9784087711498', // 鬼滅の刃 4
      '9784334761394', // 湊かなえ - イニシエーション・ラブ
      '9784101001142', // 海辺のカフカ - 村上春樹
      '9784167307011', // 太陽の塔 - 森見登美彦
    ];

    // Technical/Business books
    const technicalISBNs = [
      '9784873119038', // Clean Architecture
      '9784873118895', // 実践TypeScript
      '9784873119045', // プログラマが知るべき97のこと
      '9784873117584', // オライリー JavaScript本格入門
      '9784873118864', // Node.js超入門
      '9784873119052', // 達人プログラマー
      '9784873118611', // Python機械学習プログラミング
      '9784873119069', // システム設計の面接試験
      '9784873118758', // React入門
      '9784873119076', // データベース設計論理設計と物理設計
    ];

    const allISBNs = [...popularISBNs, ...technicalISBNs];

    for (const isbn of allISBNs) {
      try {
        await this.addBookByISBN(isbn);
        // Rate limiting - wait 200ms between requests
        await new Promise(resolve => setTimeout(resolve, 200));
      } catch (error) {
        this.logger.warn(`Failed to add book with ISBN ${isbn}: ${error.message}`);
      }
    }

    this.logger.log('Finished populating book database');
  }

  async addBookByISBN(isbn: string): Promise<BookMetadata | null> {
    // Check if book template already exists
    const existingTemplate = await this.prisma.bookTemplate.findUnique({
      where: { isbn },
    });

    if (existingTemplate) {
      this.logger.debug(`Book template with ISBN ${isbn} already exists`);
      return {
        isbn: existingTemplate.isbn,
        title: existingTemplate.title,
        author: existingTemplate.author,
        publisher: existingTemplate.publisher,
        publishedDate: existingTemplate.publishedDate,
        pageCount: existingTemplate.pageCount,
        language: existingTemplate.language,
        categories: existingTemplate.categories,
        imageUrl: existingTemplate.imageUrl,
        infoLink: existingTemplate.infoLink,
        description: existingTemplate.description,
      };
    }

    try {
      // Fetch book metadata from Google Books API
      const bookData = await this.googleBooksService.searchByIsbn(isbn);
      
      if (!bookData) {
        this.logger.warn(`No book data found for ISBN ${isbn}`);
        return null;
      }

      const bookMetadata: BookMetadata = {
        isbn: isbn, // Use the original ISBN parameter
        title: bookData.title,
        author: bookData.authors?.[0],
        publisher: bookData.publisher,
        publishedDate: bookData.publishedDate,
        pageCount: bookData.pageCount,
        language: bookData.language,
        categories: bookData.categories || [],
        imageUrl: bookData.imageLinks?.thumbnail,
        infoLink: bookData.infoLink,
        description: bookData.description || `${bookData.title}の説明`,
      };

      // Save to book_templates table
      await this.prisma.bookTemplate.create({
        data: {
          id: randomUUID(),
          isbn: bookMetadata.isbn,
          title: bookMetadata.title,
          author: bookMetadata.author,
          publisher: bookMetadata.publisher,
          publishedDate: bookMetadata.publishedDate,
          pageCount: bookMetadata.pageCount,
          language: bookMetadata.language,
          categories: bookMetadata.categories || [],
          imageUrl: bookMetadata.imageUrl,
          infoLink: bookMetadata.infoLink,
          description: bookMetadata.description || `${bookMetadata.title}の説明`,
        },
      });

      this.logger.log(`Successfully added book: ${bookMetadata.title} (ISBN: ${isbn})`);
      return bookMetadata;
    } catch (error) {
      this.logger.error(`Error adding book with ISBN ${isbn}: ${error.message}`);
      throw error;
    }
  }

  async getBookByISBN(isbn: string): Promise<BookMetadata | null> {
    const bookTemplate = await this.prisma.bookTemplate.findUnique({
      where: { isbn },
    });

    if (!bookTemplate) {
      return null;
    }

    return {
      isbn: bookTemplate.isbn,
      title: bookTemplate.title,
      author: bookTemplate.author,
      publisher: bookTemplate.publisher,
      publishedDate: bookTemplate.publishedDate,
      pageCount: bookTemplate.pageCount,
      language: bookTemplate.language,
      categories: bookTemplate.categories,
      imageUrl: bookTemplate.imageUrl,
      infoLink: bookTemplate.infoLink,
      description: bookTemplate.description,
    };
  }

  async searchBooks(query: string, limit: number = 20): Promise<BookMetadata[]> {
    const bookTemplates = await this.prisma.bookTemplate.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { author: { contains: query, mode: 'insensitive' } },
          { publisher: { contains: query, mode: 'insensitive' } },
          { categories: { has: query } },
        ],
      },
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    return bookTemplates.map(template => ({
      isbn: template.isbn,
      title: template.title,
      author: template.author,
      publisher: template.publisher,
      publishedDate: template.publishedDate,
      pageCount: template.pageCount,
      language: template.language,
      categories: template.categories,
      imageUrl: template.imageUrl,
      infoLink: template.infoLink,
      description: template.description,
    }));
  }

  async getAllPrePopulatedBooks(limit: number = 100): Promise<BookMetadata[]> {
    const bookTemplates = await this.prisma.bookTemplate.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    return bookTemplates.map(template => ({
      isbn: template.isbn,
      title: template.title,
      author: template.author,
      publisher: template.publisher,
      publishedDate: template.publishedDate,
      pageCount: template.pageCount,
      language: template.language,
      categories: template.categories,
      imageUrl: template.imageUrl,
      infoLink: template.infoLink,
      description: template.description,
    }));
  }
}