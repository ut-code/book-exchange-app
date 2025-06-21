import { Resolver, Query, Args } from '@nestjs/graphql';
import { PrismaService } from '../../../services/prisma/prisma.service';
import { BookTemplate } from '../../../models/bookTemplate';

@Resolver(() => BookTemplate)
export class BookTemplateResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [BookTemplate])
  async getAllBookTemplates(
    @Args('limit', { defaultValue: 100 }) limit: number,
  ): Promise<BookTemplate[]> {
    return this.prisma.bookTemplate.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        books: {
          include: {
            user: true,
          },
        },
      },
    }) as any;
  }

  @Query(() => [BookTemplate])
  async searchBookTemplates(
    @Args('query') query: string,
    @Args('limit', { defaultValue: 20 }) limit: number,
  ): Promise<BookTemplate[]> {
    return this.prisma.bookTemplate.findMany({
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
      include: {
        books: {
          include: {
            user: true,
          },
        },
      },
    }) as any;
  }

  @Query(() => BookTemplate, { nullable: true })
  async getBookTemplateByISBN(@Args('isbn') isbn: string): Promise<BookTemplate | null> {
    return this.prisma.bookTemplate.findUnique({
      where: { isbn },
      include: {
        books: {
          include: {
            user: true,
          },
        },
      },
    }) as any;
  }

  @Query(() => BookTemplate, { nullable: true })
  async getBookTemplateById(@Args('id') id: string): Promise<BookTemplate | null> {
    return this.prisma.bookTemplate.findUnique({
      where: { id },
      include: {
        books: {
          include: {
            user: true,
          },
        },
      },
    }) as any;
  }
}