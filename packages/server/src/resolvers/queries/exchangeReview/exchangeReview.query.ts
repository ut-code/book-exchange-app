import { Args, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '../../../services/prisma/prisma.service';
import { ExchangeReview } from '../../../models/exchangeReview';

@Resolver(() => ExchangeReview)
export class ExchangeReviewQueryResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [ExchangeReview])
  async exchangeReviews(): Promise<ExchangeReview[]> {
    return await this.prisma.exchangeReview.findMany({
      include: {
        exchangeRequest: true,
        reviewer: true,
        reviewed: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    }) as any;
  }

  @Query(() => [ExchangeReview])
  async exchangeReviewsByExchangeRequest(
    @Args('exchangeRequestId') exchangeRequestId: string,
  ): Promise<ExchangeReview[]> {
    return await this.prisma.exchangeReview.findMany({
      where: {
        exchangeRequestId,
      },
      include: {
        exchangeRequest: true,
        reviewer: true,
        reviewed: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    }) as any;
  }

  @Query(() => [ExchangeReview])
  async exchangeReviewsByUser(
    @Args('userId') userId: string,
  ): Promise<ExchangeReview[]> {
    return await this.prisma.exchangeReview.findMany({
      where: {
        reviewedUserId: userId,
      },
      include: {
        exchangeRequest: true,
        reviewer: true,
        reviewed: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    }) as any;
  }

  @Query(() => ExchangeReview, { nullable: true })
  async exchangeReview(
    @Args('id') id: string,
  ): Promise<ExchangeReview | null> {
    return await this.prisma.exchangeReview.findUnique({
      where: { id },
      include: {
        exchangeRequest: true,
        reviewer: true,
        reviewed: true,
      },
    }) as any;
  }
}