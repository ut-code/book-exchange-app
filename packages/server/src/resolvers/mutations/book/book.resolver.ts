import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { Inject, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Book } from 'src/models/book';
import { CreateBookInput, CreateBookFromIsbnInput, CreateBookFromTemplateInput, ToggleBookOwnershipInput } from './book.input';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { User } from 'src/models/user';
import { PickPrimitive } from 'src/common/primitive';
import { RequestUser } from 'src/decorators/user/user.decorator';
import { AuthGuard } from 'src/services/auth/auth.guard';
import { GoogleBooksService } from 'src/services/google-books/google-books.service';
import { z } from 'zod';
import { randomUUID } from 'crypto';

@UseGuards(AuthGuard)
@Resolver(Book)
export class BookResolver {
  constructor(
    @Inject(PrismaService) private prisma: PrismaService,
    @Inject(GoogleBooksService) private googleBooksService: GoogleBooksService,
  ) {}

  @Mutation(() => Book)
  async createBook(
    @RequestUser() requestUser: User,
    @Args('input') input: CreateBookInput,
  ) {
    const inputSchema = z.object({
      title: z.string().nonempty('Title cannot be empty.'),
      description: z.string().optional(),
    });

    const validatedInput = inputSchema.safeParse(input);
    if (validatedInput.success === false) {
      throw new Error(validatedInput.error.message);
    }

    return this.prisma.book.create({
      data: {
        id: randomUUID(),
        title: input.title,
        description: input.description,
        condition: input.condition,
        isAvailable: input.isAvailable,
        notes: input.notes,
        userId: requestUser.id,
        bookTemplateId: input.bookTemplateId,
      },
      include: {
        user: true,
        bookTemplate: true,
      },
    }) as any;
  }

  @Mutation(() => Book)
  async createBookFromIsbn(
    @RequestUser() requestUser: User,
    @Args('input') input: CreateBookFromIsbnInput,
  ) {
    const inputSchema = z.object({
      isbn: z.string()
        .min(1, 'ISBN cannot be empty.')
        .regex(/^[0-9\-\s]+$/, 'ISBN must contain only numbers, hyphens, and spaces')
        .transform(val => val.replace(/[-\s]/g, ''))
        .refine(val => val.length === 10 || val.length === 13, 'ISBN must be 10 or 13 digits'),
      description: z.string().optional(),
    });

    const validatedInput = inputSchema.safeParse(input);
    if (validatedInput.success === false) {
      const errorMessage = validatedInput.error.errors.map(err => err.message).join(', ');
      throw new Error(`Validation error: ${errorMessage}`);
    }

    const cleanIsbn = validatedInput.data.isbn;

    try {
      // Check if book template exists (Books don't have ISBN directly anymore)
      const existingTemplate = await this.prisma.bookTemplate.findUnique({
        where: { isbn: cleanIsbn },
      });

      // We don't prevent multiple users from having the same book anymore
      // since books are instances and templates are separate

      const bookInfo = await this.googleBooksService.searchByIsbn(cleanIsbn);
      if (!bookInfo) {
        throw new Error('Book not found with the provided ISBN. Please check the ISBN and try again.');
      }

      if (!bookInfo.title) {
        throw new Error('Invalid book data received from Google Books API.');
      }

      // First create or get book template
      let bookTemplate = await this.prisma.bookTemplate.findUnique({
        where: { isbn: cleanIsbn },
      });

      if (!bookTemplate) {
        bookTemplate = await this.prisma.bookTemplate.create({
          data: {
            id: randomUUID(),
            isbn: cleanIsbn,
            title: bookInfo.title,
            author: bookInfo.authors?.join(', ') || null,
            publisher: bookInfo.publisher || null,
            publishedDate: bookInfo.publishedDate || null,
            pageCount: bookInfo.pageCount || null,
            language: bookInfo.language || null,
            categories: bookInfo.categories || [],
            imageUrl: bookInfo.imageLinks?.thumbnail || null,
            infoLink: bookInfo.infoLink || null,
            description: bookInfo.description || '',
          },
        });
      }

      // Then create user's book instance
      return this.prisma.book.create({
        data: {
          id: randomUUID(),
          title: bookTemplate.title,
          description: input.description || bookTemplate.description || '',
          condition: input.condition,
          isAvailable: input.isAvailable,
          notes: input.notes,
          userId: requestUser.id,
          bookTemplateId: bookTemplate.id,
        },
        include: {
          user: true,
          bookTemplate: true,
        },
      }) as any;
    } catch (error) {
      console.error('CreateBookFromIsbn error:', error);
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Book)
  async createBookFromTemplate(
    @Args('input') input: CreateBookFromTemplateInput,
    @RequestUser() requestUser: User,
  ): Promise<Book> {
    try {
      // Get book template
      const bookTemplate = await this.prisma.bookTemplate.findUnique({
        where: { id: input.bookTemplateId },
      });

      if (!bookTemplate) {
        throw new Error('Book template not found');
      }

      // Create user's book instance
      return this.prisma.book.create({
        data: {
          id: randomUUID(),
          title: bookTemplate.title,
          description: input.customDescription || bookTemplate.description || '',
          condition: input.condition,
          isAvailable: input.isAvailable,
          notes: input.notes,
          userId: requestUser.id,
          bookTemplateId: bookTemplate.id,
        },
        include: {
          user: true,
          bookTemplate: true,
        },
      }) as any;
    } catch (error) {
      console.error('CreateBookFromTemplate error:', error);
      throw error;
    }
  }

  @Mutation(() => [Book])
  async createBooks(
    @RequestUser() requestUser: User,
    @Args('input', { type: () => [CreateBookInput] }) input: CreateBookInput[],
  ) {
    const inputSchema = z.array(
      z.object({
        title: z.string().nonempty('Title cannot be empty.'),
        description: z.string().optional(),
      }),
    );

    const validatedInput = inputSchema.safeParse(input);
    if (validatedInput.success === false) {
      throw new Error(validatedInput.error.message);
    }

    return this.prisma.book.createMany({
      data: input.map((book) => ({
        id: randomUUID(),
        title: book.title,
        description: book.description,
        userId: requestUser.id,
      })),
    });
  }

  @Mutation(() => Book)
  async updateBook(
    @RequestUser() requestUser: User,
    @Args('id') id: string,
    @Args('input') input: CreateBookInput,
  ) {
    const book = await this.prisma.book.findUnique({
      where: {
        id,
      },
    });
    if (book.userId !== requestUser.id) {
      throw new UnauthorizedException('Unauthorized');
    }
    return this.prisma.book.update({
      where: {
        id,
      },
      data: {
        title: input.title,
        description: input.description,
      },
    });
  }

  @Mutation(() => Boolean)
  async deleteBook(@RequestUser() requestUser: User, @Args('id') id: string) {
    const book = await this.prisma.book.findUnique({
      where: {
        id,
      },
    });
    if (!book) {
      throw new Error('Book not found');
    }
    if (book.userId !== requestUser.id) {
      throw new UnauthorizedException('Unauthorized');
    }
    await this.prisma.book.delete({
      where: {
        id,
      },
    });
    return true;
  }

  // Admin-only mutations
  @Mutation(() => Boolean)
  async adminDeleteBook(
    @RequestUser() requestUser: User,
    @Args('bookId') bookId: string,
  ) {
    // TODO: Add admin check
    // For now, allow any authenticated user to delete any book
    
    const book = await this.prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!book) {
      throw new Error('Book not found');
    }

    await this.prisma.book.delete({
      where: { id: bookId },
    });

    return true;
  }

  @Mutation(() => Book)
  async adminUpdateBook(
    @RequestUser() requestUser: User,
    @Args('bookId') bookId: string,
    @Args('input') input: CreateBookInput,
  ) {
    // TODO: Add admin check
    // For now, allow any authenticated user to update any book
    
    const book = await this.prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!book) {
      throw new Error('Book not found');
    }

    return this.prisma.book.update({
      where: { id: bookId },
      data: {
        title: input.title,
        description: input.description,
        condition: input.condition,
        isAvailable: input.isAvailable,
        notes: input.notes,
        bookTemplateId: input.bookTemplateId,
      },
      include: {
        user: true,
        bookTemplate: true,
      },
    });
  }

  @Mutation(() => [Book])
  async deleteBooks(
    @RequestUser() requestUser: User,
    @Args('ids', { type: () => [String] }) ids: string[],
  ) {
    const books = await this.prisma.book.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    if (books.some((book) => book.userId !== requestUser.id)) {
      throw new UnauthorizedException('Unauthorized');
    }
    return this.prisma.book.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  @Query(() => Boolean)
  async isBookOwnedByUser(
    @Args('bookTemplateId') bookTemplateId: string,
    @RequestUser() user: User,
  ) {
    const book = await this.prisma.book.findFirst({
      where: {
        userId: user.id,
        bookTemplateId: bookTemplateId,
      },
    });

    return !!book;
  }

  @Query(() => Book, { nullable: true })
  async getUserBookByTemplate(
    @Args('bookTemplateId') bookTemplateId: string,
    @RequestUser() user: User,
  ) {
    return this.prisma.book.findFirst({
      where: {
        userId: user.id,
        bookTemplateId: bookTemplateId,
      },
      include: {
        user: true,
        bookTemplate: true,
      },
    }) as any;
  }

  @Mutation(() => Book, { nullable: true })
  async toggleBookOwnership(
    @Args('input') input: ToggleBookOwnershipInput,
    @RequestUser() user: User,
  ) {
    // Check if user already owns this book
    const existingBook = await this.prisma.book.findFirst({
      where: {
        userId: user.id,
        bookTemplateId: input.bookTemplateId,
      },
    });

    if (existingBook) {
      // Remove ownership (delete the book)
      await this.prisma.book.delete({
        where: {
          id: existingBook.id,
        },
      });
      return null;
    } else {
      // Add ownership (create a new book)
      const bookTemplate = await this.prisma.bookTemplate.findUnique({
        where: { id: input.bookTemplateId },
      });

      if (!bookTemplate) {
        throw new Error('Book template not found');
      }

      return this.prisma.book.create({
        data: {
          id: randomUUID(),
          title: bookTemplate.title,
          description: bookTemplate.description || '',
          userId: user.id,
          bookTemplateId: bookTemplate.id,
        },
        include: {
          user: true,
          bookTemplate: true,
        },
      }) as any;
    }
  }
}
