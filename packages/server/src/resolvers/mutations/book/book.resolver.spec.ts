import { Test, TestingModule } from '@nestjs/testing';
import { BookResolver } from './book.resolver';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { GoogleBooksService } from 'src/services/google-books/google-books.service';
import { UnauthorizedException } from '@nestjs/common';
import { BookCondition } from 'src/models/book';

describe('BookResolver', () => {
  let resolver: BookResolver;
  let prismaService: any;
  let googleBooksService: any;

  const mockUser = {
    id: 'user1',
    username: 'testuser',
    password: 'hashedPassword',
    hashedPassword: 'hashedPassword',
    trustScore: 5.0,
    posts: [],
    books: [],
    requesterExchangeRequest: [],
    addresseeExchangeRequest: [],
    trustScoreHistory: [],
    receivedTrustReviews: [],
    givenTrustReviews: [],
  } as any;

  const mockBook = {
    id: 'book1',
    title: 'Test Book',
    description: 'Test Description',
    condition: BookCondition.GOOD,
    isAvailable: true,
    notes: 'Test notes',
    userId: 'user1',
    bookTemplateId: 'template1',
    createdAt: new Date(),
    updatedAt: new Date(),
    user: mockUser,
    bookTemplate: {
      id: 'template1',
      title: 'Test Book',
      isbn: '9781234567890',
    },
  };

  const mockBookTemplate = {
    id: 'template1',
    isbn: '9781234567890',
    title: 'Test Book',
    author: 'Test Author',
    publisher: 'Test Publisher',
    publishedDate: '2023-01-01',
    pageCount: 200,
    language: 'ja',
    categories: ['Fiction'],
    imageUrl: 'http://example.com/image.jpg',
    infoLink: 'http://example.com/info',
    description: 'Test Description',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockGoogleBookInfo = {
    title: 'Test Book',
    authors: ['Test Author'],
    publisher: 'Test Publisher',
    publishedDate: '2023-01-01',
    description: 'Test Description',
    pageCount: 200,
    categories: ['Fiction'],
    imageLinks: { thumbnail: 'http://example.com/image.jpg' },
    language: 'ja',
    infoLink: 'http://example.com/info',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookResolver,
        {
          provide: PrismaService,
          useValue: {
            book: {
              create: jest.fn(),
              findFirst: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
            bookTemplate: {
              create: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
        {
          provide: GoogleBooksService,
          useValue: {
            searchByIsbn: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<BookResolver>(BookResolver);
    prismaService = module.get(PrismaService);
    googleBooksService = module.get(GoogleBooksService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createBook', () => {
    it('should create a book successfully', async () => {
      const input = {
        title: 'Test Book',
        description: 'Test Description',
        condition: BookCondition.GOOD,
        isAvailable: true,
        notes: 'Test notes',
        bookTemplateId: 'template1',
      };

      prismaService.book.create.mockResolvedValue(mockBook);

      const result = await resolver.createBook(mockUser, input);

      expect(result).toEqual(mockBook);
      expect(prismaService.book.create).toHaveBeenCalledWith({
        data: {
          id: expect.any(String),
          title: input.title,
          description: input.description,
          condition: input.condition,
          isAvailable: input.isAvailable,
          notes: input.notes,
          userId: mockUser.id,
          bookTemplateId: input.bookTemplateId,
        },
        include: {
          user: true,
          bookTemplate: true,
        },
      });
    });

    it('should throw an error for invalid input', async () => {
      const input = {
        title: '',
        description: 'Test Description',
        condition: BookCondition.GOOD,
        isAvailable: true,
      };

      await expect(resolver.createBook(mockUser, input)).rejects.toThrow();
    });
  });

  describe('createBookFromIsbn', () => {
    it('should create a book from ISBN successfully', async () => {
      const input = {
        isbn: '9781234567890',
        description: 'Test Description',
        condition: BookCondition.GOOD,
        isAvailable: true,
        notes: 'Test notes',
      };

      prismaService.bookTemplate.findUnique.mockResolvedValue(null);
      googleBooksService.searchByIsbn.mockResolvedValue(mockGoogleBookInfo);
      prismaService.bookTemplate.create.mockResolvedValue(mockBookTemplate);
      prismaService.book.create.mockResolvedValue(mockBook);

      const result = await resolver.createBookFromIsbn(mockUser, input);

      expect(result).toEqual(mockBook);
      expect(googleBooksService.searchByIsbn).toHaveBeenCalledWith('9781234567890');
    });

    it('should throw error when ISBN not found', async () => {
      const input = {
        isbn: '9781234567890',
        description: 'Test Description',
        condition: BookCondition.GOOD,
        isAvailable: true,
      };

      prismaService.bookTemplate.findUnique.mockResolvedValue(null);
      googleBooksService.searchByIsbn.mockResolvedValue(null);

      await expect(resolver.createBookFromIsbn(mockUser, input)).rejects.toThrow();
    });
  });

  describe('updateBook', () => {
    it('should update a book successfully', async () => {
      const input = {
        title: 'Updated Book',
        description: 'Updated Description',
        condition: BookCondition.VERY_GOOD,
        isAvailable: false,
      };

      prismaService.book.findUnique.mockResolvedValue(mockBook);
      prismaService.book.update.mockResolvedValue({ ...mockBook, ...input });

      const result = await resolver.updateBook(mockUser, 'book1', input);

      expect(result).toEqual({ ...mockBook, ...input });
      expect(prismaService.book.update).toHaveBeenCalledWith({
        where: { id: 'book1' },
        data: {
          title: input.title,
          description: input.description,
        },
      });
    });

    it('should throw unauthorized error for wrong user', async () => {
      const input = {
        title: 'Updated Book',
        description: 'Updated Description',
        condition: BookCondition.GOOD,
        isAvailable: true,
      };

      const otherUserBook = { ...mockBook, userId: 'other-user' };
      prismaService.book.findUnique.mockResolvedValue(otherUserBook);

      await expect(resolver.updateBook(mockUser, 'book1', input)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('deleteBook', () => {
    it('should delete a book successfully', async () => {
      prismaService.book.findUnique.mockResolvedValue(mockBook);
      prismaService.book.delete.mockResolvedValue(true);

      const result = await resolver.deleteBook(mockUser, 'book1');

      expect(result).toBe(true);
      expect(prismaService.book.delete).toHaveBeenCalledWith({
        where: { id: 'book1' },
      });
    });

    it('should throw error when book not found', async () => {
      prismaService.book.findUnique.mockResolvedValue(null);

      await expect(resolver.deleteBook(mockUser, 'book1')).rejects.toThrow('Book not found');
    });

    it('should throw unauthorized error for wrong user', async () => {
      const otherUserBook = { ...mockBook, userId: 'other-user' };
      prismaService.book.findUnique.mockResolvedValue(otherUserBook);

      await expect(resolver.deleteBook(mockUser, 'book1')).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('adminDeleteBook', () => {
    it('should allow admin to delete any book', async () => {
      prismaService.book.findUnique.mockResolvedValue(mockBook);
      prismaService.book.delete.mockResolvedValue(true);

      const result = await resolver.adminDeleteBook(mockUser, 'book1');

      expect(result).toBe(true);
      expect(prismaService.book.delete).toHaveBeenCalledWith({
        where: { id: 'book1' },
      });
    });
  });

  describe('adminUpdateBook', () => {
    it('should allow admin to update any book', async () => {
      const input = {
        title: 'Admin Updated Book',
        description: 'Admin Updated Description',
        condition: BookCondition.EXCELLENT,
        isAvailable: true,
      };

      prismaService.book.findUnique.mockResolvedValue(mockBook);
      prismaService.book.update.mockResolvedValue({ ...mockBook, ...input });

      const result = await resolver.adminUpdateBook(mockUser, 'book1', input);

      expect(result).toEqual({ ...mockBook, ...input });
    });
  });
});