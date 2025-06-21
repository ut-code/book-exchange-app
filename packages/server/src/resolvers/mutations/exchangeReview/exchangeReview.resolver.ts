import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '../../../services/prisma/prisma.service';
import { ExchangeReview } from '../../../models/exchangeReview';
import { CreateExchangeReviewInput, UpdateExchangeReviewInput } from './exchangeReview.input';
import { TrustScoreService } from '../../../services/trustScore.service';
import { randomUUID } from 'crypto';

@Resolver(() => ExchangeReview)
export class ExchangeReviewResolver {
  constructor(
    private prisma: PrismaService,
    private trustScoreService: TrustScoreService,
  ) {}

  @Mutation(() => ExchangeReview)
  async createExchangeReview(
    @Args('input') input: CreateExchangeReviewInput,
    @Args('reviewerUserId') reviewerUserId: string,
  ): Promise<ExchangeReview> {
    const existingReview = await this.prisma.exchangeReview.findUnique({
      where: {
        exchangeRequestId_reviewerUserId: {
          exchangeRequestId: input.exchangeRequestId,
          reviewerUserId: reviewerUserId,
        },
      },
    });

    if (existingReview) {
      throw new Error('Review already exists for this exchange request');
    }

    const exchangeRequest = await this.prisma.exchangeRequest.findUnique({
      where: { id: input.exchangeRequestId },
    });

    if (!exchangeRequest) {
      throw new Error('Exchange request not found');
    }

    if (exchangeRequest.requesterUserId !== reviewerUserId && 
        exchangeRequest.addresseeUserId !== reviewerUserId) {
      throw new Error('You can only review exchanges you participated in');
    }

    const review = await this.prisma.exchangeReview.create({
      data: {
        id: randomUUID(),
        ...input,
        reviewerUserId,
      },
      include: {
        exchangeRequest: true,
        reviewer: true,
        reviewed: true,
      },
    });

    await this.trustScoreService.updateTrustScoreFromExchangeReview(review as any);

    return review as any;
  }

  @Mutation(() => ExchangeReview)
  async updateExchangeReview(
    @Args('input') input: UpdateExchangeReviewInput,
    @Args('reviewerUserId') reviewerUserId: string,
  ): Promise<ExchangeReview> {
    const existingReview = await this.prisma.exchangeReview.findUnique({
      where: { id: input.id },
    });

    if (!existingReview) {
      throw new Error('Exchange review not found');
    }

    if (existingReview.reviewerUserId !== reviewerUserId) {
      throw new Error('You can only update your own reviews');
    }

    const { id, ...updateData } = input;
    const review = await this.prisma.exchangeReview.update({
      where: { id },
      data: updateData,
      include: {
        exchangeRequest: true,
        reviewer: true,
        reviewed: true,
      },
    });

    await this.trustScoreService.updateTrustScoreFromExchangeReview(review as any);

    return review as any;
  }

  @Query(() => [ExchangeReview])
  async getExchangeReviewsByExchangeRequest(
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
  async getExchangeReviewsByUser(
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
  async getExchangeReview(
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

  @Mutation(() => Boolean)
  async deleteExchangeReview(
    @Args('id') id: string,
    @Args('reviewerUserId') reviewerUserId: string,
  ): Promise<boolean> {
    const existingReview = await this.prisma.exchangeReview.findUnique({
      where: { id },
    });

    if (!existingReview) {
      throw new Error('Exchange review not found');
    }

    if (existingReview.reviewerUserId !== reviewerUserId) {
      throw new Error('You can only delete your own reviews');
    }

    await this.prisma.exchangeReview.delete({
      where: { id },
    });

    return true;
  }
}