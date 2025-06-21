import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../../services/auth/auth.guard';
import { BookDatabaseService } from '../../../services/book-database/book-database.service';
import { BookMetadata } from '../../../models/bookMetadata';

@Resolver()
export class BookDatabaseMutationResolver {
  constructor(private readonly bookDatabaseService: BookDatabaseService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async populateBookDatabase(): Promise<boolean> {
    try {
      await this.bookDatabaseService.populatePopularBooks();
      return true;
    } catch (error) {
      throw new Error(`Failed to populate book database: ${error.message}`);
    }
  }

  @UseGuards(AuthGuard)
  @Mutation(() => BookMetadata, { nullable: true })
  async addBookToDatabase(@Args('isbn') isbn: string): Promise<BookMetadata | null> {
    const result = await this.bookDatabaseService.addBookByISBN(isbn);
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
}