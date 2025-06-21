import { Resolver, Query, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../../services/auth/auth.guard';
import { PrismaService } from '../../../services/prisma/prisma.service';
import { ExchangeHistory } from '../../../models/exchangeHistory';

@Resolver(() => ExchangeHistory)
export class ExchangeHistoryResolver {
  constructor(private readonly prisma: PrismaService) {}

  @UseGuards(AuthGuard)
  @Query(() => [ExchangeHistory])
  async getMyExchangeHistory(@Context() context: any): Promise<ExchangeHistory[]> {
    const userId = context.req.user.sub;
    
    return this.prisma.exchangeHistory.findMany({
      where: {
        OR: [
          { requesterId: userId },
          { recipientId: userId },
        ],
      },
      include: {
        requester: true,
        recipient: true,
        requestedBook: {
          include: {
            bookTemplate: true,
          },
        },
        offeredBook: {
          include: {
            bookTemplate: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    }) as any;
  }

  @UseGuards(AuthGuard)
  @Query(() => [ExchangeHistory])
  async getUserExchangeHistory(@Args('userId') userId: string): Promise<ExchangeHistory[]> {
    return this.prisma.exchangeHistory.findMany({
      where: {
        OR: [
          { requesterId: userId },
          { recipientId: userId },
        ],
      },
      include: {
        requester: true,
        recipient: true,
        requestedBook: {
          include: {
            bookTemplate: true,
          },
        },
        offeredBook: {
          include: {
            bookTemplate: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    }) as any;
  }
}