import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../../services/auth/auth.guard';
import { PrismaService } from '../../../services/prisma/prisma.service';
import { TrustReview } from '../../../models/trustReview';
import { TrustScoreHistory } from '../../../models/trustScoreHistory';
import { CreateTrustReviewInput, UpdateTrustReviewInput } from './trustReview.input';
import { randomUUID } from 'crypto';

@Resolver(() => TrustReview)
export class TrustReviewResolver {
  constructor(private readonly prisma: PrismaService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => TrustReview)
  async createTrustReview(
    @Args('createTrustReviewInput') createTrustReviewInput: CreateTrustReviewInput,
    @Context() context: any,
  ): Promise<TrustReview> {
    const reviewerUserId = context.req.user.sub;
    
    const existingReview = await this.prisma.trustReview.findUnique({
      where: {
        reviewerUserId_targetUserId_exchangeRequestId: {
          reviewerUserId,
          targetUserId: createTrustReviewInput.targetUserId,
          exchangeRequestId: createTrustReviewInput.exchangeRequestId || null,
        },
      },
    });

    if (existingReview) {
      throw new Error('Trust review already exists for this exchange');
    }

    const trustReview = await this.prisma.trustReview.create({
      data: {
        id: randomUUID(),
        ...createTrustReviewInput,
        reviewerUserId,
      },
      include: {
        reviewerUser: true,
        targetUser: true,
        exchangeRequest: true,
      },
    });

    await this.updateUserTrustScore(createTrustReviewInput.targetUserId);

    return trustReview as any;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => TrustReview)
  async updateTrustReview(
    @Args('updateTrustReviewInput') updateTrustReviewInput: UpdateTrustReviewInput,
    @Context() context: any,
  ): Promise<TrustReview> {
    const reviewerUserId = context.req.user.sub;

    const existingReview = await this.prisma.trustReview.findUnique({
      where: { id: updateTrustReviewInput.id },
    });

    if (!existingReview || existingReview.reviewerUserId !== reviewerUserId) {
      throw new Error('Trust review not found or unauthorized');
    }

    const { id, ...updateData } = updateTrustReviewInput;
    const trustReview = await this.prisma.trustReview.update({
      where: { id },
      data: updateData,
      include: {
        reviewerUser: true,
        targetUser: true,
        exchangeRequest: true,
      },
    });

    await this.updateUserTrustScore(existingReview.targetUserId);

    return trustReview as any;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async deleteTrustReview(
    @Args('id') id: string,
    @Context() context: any,
  ): Promise<boolean> {
    const reviewerUserId = context.req.user.sub;

    const existingReview = await this.prisma.trustReview.findUnique({
      where: { id },
    });

    if (!existingReview || existingReview.reviewerUserId !== reviewerUserId) {
      throw new Error('Trust review not found or unauthorized');
    }

    await this.prisma.trustReview.delete({
      where: { id },
    });

    await this.updateUserTrustScore(existingReview.targetUserId);

    return true;
  }

  @Query(() => [TrustReview])
  async getUserTrustReviews(@Args('userId') userId: string): Promise<TrustReview[]> {
    return this.prisma.trustReview.findMany({
      where: { targetUserId: userId },
      include: {
        reviewerUser: true,
        targetUser: true,
        exchangeRequest: true,
      },
      orderBy: { createdAt: 'desc' },
    }) as any;
  }

  @Query(() => [TrustScoreHistory])
  async getUserTrustScoreHistory(@Args('userId') userId: string): Promise<TrustScoreHistory[]> {
    return this.prisma.trustScoreHistory.findMany({
      where: { userId },
      include: {
        user: true,
      },
      orderBy: { createdAt: 'desc' },
    }) as any;
  }

  private async updateUserTrustScore(userId: string): Promise<void> {
    const reviews = await this.prisma.trustReview.findMany({
      where: { targetUserId: userId },
    });

    const currentUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!currentUser) return;

    const oldScore = currentUser.trustScore;
    let newScore = 5.0;

    if (reviews.length > 0) {
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      newScore = totalRating / reviews.length;
      
      newScore = Math.round(newScore * 10) / 10;
      newScore = Math.max(1.0, Math.min(5.0, newScore));
    }

    if (Math.abs(oldScore - newScore) > 0.01) {
      await this.prisma.user.update({
        where: { id: userId },
        data: { trustScore: newScore },
      });

      await this.prisma.trustScoreHistory.create({
        data: {
          id: randomUUID(),
          userId,
          oldScore,
          newScore,
          reason: `Updated based on ${reviews.length} review(s)`,
        },
      });
    }
  }
}