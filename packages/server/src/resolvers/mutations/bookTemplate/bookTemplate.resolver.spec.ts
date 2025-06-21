import { Test, TestingModule } from '@nestjs/testing';
import { BookTemplateResolver } from './bookTemplate.resolver';
import { PrismaService } from 'src/services/prisma/prisma.service';

describe('BookTemplateResolver', () => {
  let resolver: BookTemplateResolver;
  let prismaService: any;

  const mockUser = {
    id: 'user1',
    username: 'testuser',
  } as any;

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
    books: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookTemplateResolver,
        {
          provide: PrismaService,
          useValue: {
            bookTemplate: {
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<BookTemplateResolver>(BookTemplateResolver);
    prismaService = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('adminUpdateBookTemplate', () => {
    it('should update book template successfully', async () => {
      const input = {
        title: 'Updated Book',
        author: 'Updated Author',
        publisher: 'Updated Publisher',
        description: 'Updated Description',
      };

      prismaService.bookTemplate.findUnique.mockResolvedValue(mockBookTemplate);
      prismaService.bookTemplate.update.mockResolvedValue({
        ...mockBookTemplate,
        ...input,
      });

      const result = await resolver.adminUpdateBookTemplate(mockUser, 'template1', input);

      expect(result).toEqual({ ...mockBookTemplate, ...input });
      expect(prismaService.bookTemplate.update).toHaveBeenCalledWith({
        where: { id: 'template1' },
        data: {
          title: input.title,
          author: input.author,
          publisher: input.publisher,
          publishedDate: undefined,
          pageCount: undefined,
          language: undefined,
          categories: [],
          imageUrl: undefined,
          infoLink: undefined,
          description: input.description,
        },
        include: {
          books: true,
        },
      });
    });

    it('should throw error when book template not found', async () => {
      const input = {
        title: 'Updated Book',
        author: 'Updated Author',
      };

      prismaService.bookTemplate.findUnique.mockResolvedValue(null);

      await expect(
        resolver.adminUpdateBookTemplate(mockUser, 'nonexistent', input)
      ).rejects.toThrow('Book template not found');
    });
  });

  describe('adminDeleteBookTemplate', () => {
    it('should delete book template successfully when no books are using it', async () => {
      const templateWithNoBooks = { ...mockBookTemplate, books: [] };
      
      prismaService.bookTemplate.findUnique.mockResolvedValue(templateWithNoBooks);
      prismaService.bookTemplate.delete.mockResolvedValue(true);

      const result = await resolver.adminDeleteBookTemplate(mockUser, 'template1');

      expect(result).toBe(true);
      expect(prismaService.bookTemplate.delete).toHaveBeenCalledWith({
        where: { id: 'template1' },
      });
    });

    it('should throw error when book template not found', async () => {
      prismaService.bookTemplate.findUnique.mockResolvedValue(null);

      await expect(
        resolver.adminDeleteBookTemplate(mockUser, 'nonexistent')
      ).rejects.toThrow('Book template not found');
    });

    it('should throw error when books are using the template', async () => {
      const templateWithBooks = {
        ...mockBookTemplate,
        books: [{ id: 'book1' }, { id: 'book2' }],
      };
      
      prismaService.bookTemplate.findUnique.mockResolvedValue(templateWithBooks);

      await expect(
        resolver.adminDeleteBookTemplate(mockUser, 'template1')
      ).rejects.toThrow('Cannot delete book template: there are books using this template');
    });
  });
});