import { Resolver, Query, Args } from '@nestjs/graphql';
import { BookDatabaseService } from '../../../services/book-database/book-database.service';
import { BookMetadata } from '../../../models/bookMetadata';

@Resolver(() => BookMetadata)
export class BookDatabaseResolver {
  constructor(private readonly bookDatabaseService: BookDatabaseService) {}

  @Query(() => BookMetadata, { nullable: true })
  async getBookMetadataByISBN(@Args('isbn') isbn: string): Promise<BookMetadata | null> {
    const result = await this.bookDatabaseService.getBookByISBN(isbn);
    if (!result) return null;
    
    return {
      isbn: result.isbn,
      title: result.title,
      author: result.author,
      publisher: result.publisher,
      publishedDate: result.publishedDate,
      pageCount: result.pageCount,
      language: result.language,
      categories: result.categories || [],
      imageUrl: result.imageUrl,
      infoLink: result.infoLink,
      description: result.description,
    };
  }

  @Query(() => [BookMetadata])
  async searchBookMetadata(
    @Args('query') query: string,
    @Args('limit', { defaultValue: 20 }) limit: number,
  ): Promise<BookMetadata[]> {
    const results = await this.bookDatabaseService.searchBooks(query, limit);
    return results.map(result => ({
      isbn: result.isbn,
      title: result.title,
      author: result.author,
      publisher: result.publisher,
      publishedDate: result.publishedDate,
      pageCount: result.pageCount,
      language: result.language,
      categories: result.categories || [],
      imageUrl: result.imageUrl,
      infoLink: result.infoLink,
      description: result.description,
    }));
  }

  @Query(() => [BookMetadata])
  async getAllPrePopulatedBooks(
    @Args('limit', { defaultValue: 100 }) limit: number,
  ): Promise<BookMetadata[]> {
    const results = await this.bookDatabaseService.getAllPrePopulatedBooks(limit);
    return results.map(result => ({
      isbn: result.isbn,
      title: result.title,
      author: result.author,
      publisher: result.publisher,
      publishedDate: result.publishedDate,
      pageCount: result.pageCount,
      language: result.language,
      categories: result.categories || [],
      imageUrl: result.imageUrl,
      infoLink: result.infoLink,
      description: result.description,
    }));
  }
}