import { Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../../services/auth/auth.guard';
import { PrismaService } from '../../../services/prisma/prisma.service';
import { AdminStats } from './admin.types';

@Resolver()
export class AdminResolver {
  constructor(private readonly prisma: PrismaService) {}

  @UseGuards(AuthGuard)
  @Query(() => AdminStats)
  async getAdminStats(): Promise<AdminStats> {
    const [
      totalUsers,
      totalBooks,
      totalBookTemplates,
      totalExchanges,
      totalReviews,
      totalTrustReviews,
      activeUsers,
      recentUsers,
      recentBooks,
      recentBookTemplates,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.book.count(),
      this.prisma.bookTemplate.count(),
      this.prisma.exchangeRequest.count(),
      this.prisma.exchangeReview.count(),
      this.prisma.trustReview.count(),
      this.prisma.user.count(),
      this.prisma.user.findMany({
        take: 5,
        orderBy: { id: 'desc' },
        select: {
          id: true,
          username: true,
          trustScore: true,
          _count: {
            select: {
              books: true,
              receivedTrustReviews: true,
            },
          },
        },
      }),
      this.prisma.book.findMany({
        take: 5,
        orderBy: { id: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      }),
      this.prisma.bookTemplate.findMany({
        take: 5,
        orderBy: { id: 'desc' },
        include: {
          _count: {
            select: {
              books: true,
            },
          },
        },
      }),
    ]);

    return {
      totalUsers,
      totalBooks,
      totalBookTemplates,
      totalExchanges,
      totalReviews,
      totalTrustReviews,
      activeUsers,
      recentUsers: recentUsers.map(user => ({
        id: user.id,
        username: user.username,
        createdAt: new Date(),
        updatedAt: new Date(),
        trustScore: user.trustScore,
        bookCount: user._count.books,
        reviewCount: user._count.receivedTrustReviews,
      })),
      recentBooks: recentBooks.map(book => ({
        id: book.id,
        title: book.title,
        description: book.description,
        condition: book.condition as any,
        isAvailable: book.isAvailable,
        createdAt: new Date(),
        user: book.user,
      })),
      recentBookTemplates: recentBookTemplates.map(template => ({
        id: template.id,
        isbn: template.isbn,
        title: template.title,
        author: template.author,
        publisher: template.publisher,
        createdAt: new Date(),
        bookCount: template._count.books,
      })),
    };
  }
}