import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '../../../services/prisma/prisma.service';
import { ExchangeReview } from '../../../models/exchangeReview';
import { CreateExchangeReviewInput, UpdateExchangeReviewInput } from './exchangeReview.input';
import { TrustScoreService } from '../../../services/trustScore.service';
import { randomUUID } from 'crypto';

function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

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
    if (!isValidUUID(reviewerUserId)) {
      throw new Error('Invalid reviewerUserId format. Expected a valid UUID.');
    }
    if (!isValidUUID(input.exchangeRequestId)) {
      throw new Error('Invalid exchangeRequestId format. Expected a valid UUID.');
    }
    if (!isValidUUID(input.reviewedUserId)) {
      throw new Error('Invalid reviewedUserId format. Expected a valid UUID.');
    }

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
    if (!isValidUUID(input.id)) {
      throw new Error('Invalid id format. Expected a valid UUID.');
    }
    if (!isValidUUID(reviewerUserId)) {
      throw new Error('Invalid reviewerUserId format. Expected a valid UUID.');
    }

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
    if (!isValidUUID(exchangeRequestId)) {
      throw new Error('Invalid exchangeRequestId format. Expected a valid UUID.');
    }

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
    if (!isValidUUID(userId)) {
      throw new Error('Invalid userId format. Expected a valid UUID.');
    }

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
    if (!isValidUUID(id)) {
      throw new Error('Invalid id format. Expected a valid UUID.');
    }

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
    if (!isValidUUID(id)) {
      throw new Error('Invalid id format. Expected a valid UUID.');
    }
    if (!isValidUUID(reviewerUserId)) {
      throw new Error('Invalid reviewerUserId format. Expected a valid UUID.');
    }

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