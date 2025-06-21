import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ExchangeReview } from '../models/exchangeReview';
import { randomUUID } from 'crypto';

@Injectable()
export class TrustScoreService {
  constructor(private prisma: PrismaService) {}

  async updateTrustScoreFromExchangeReview(review: ExchangeReview): Promise<void> {
    const reviewedUser = await this.prisma.user.findUnique({
      where: { id: review.reviewedUserId },
    });

    if (!reviewedUser) {
      throw new Error('Reviewed user not found');
    }

    const allReviews = await this.prisma.exchangeReview.findMany({
      where: {
        reviewedUserId: review.reviewedUserId,
      },
    });

    if (allReviews.length === 0) {
      return;
    }

    const totalScore = allReviews.reduce((sum, r) => sum + r.overallRating, 0);
    const averageScore = totalScore / allReviews.length;

    const oldScore = reviewedUser.trustScore;
    const newScore = Math.round(averageScore * 100) / 100;

    await this.prisma.user.update({
      where: { id: review.reviewedUserId },
      data: { trustScore: newScore },
    });

    await this.prisma.trustScoreHistory.create({
      data: {
        id: randomUUID(),
        userId: review.reviewedUserId,
        oldScore,
        newScore,
        reason: `Updated from exchange review (ID: ${review.id})`,
      },
    });
  }

  async calculateUserTrustScore(userId: string): Promise<number> {
    const reviews = await this.prisma.exchangeReview.findMany({
      where: {
        reviewedUserId: userId,
      },
    });

    if (reviews.length === 0) {
      return 5.0;
    }

    const totalScore = reviews.reduce((sum, review) => sum + review.overallRating, 0);
    return Math.round((totalScore / reviews.length) * 100) / 100;
  }

  async getUserExchangeStats(userId: string): Promise<{
    totalExchanges: number;
    averageRating: number;
    smoothExchanges: number;
    smoothPercentage: number;
  }> {
    const reviews = await this.prisma.exchangeReview.findMany({
      where: {
        reviewedUserId: userId,
      },
    });

    const totalExchanges = reviews.length;
    const smoothExchanges = reviews.filter(r => r.wasSmooth).length;
    const averageRating = totalExchanges > 0 
      ? Math.round((reviews.reduce((sum, r) => sum + r.overallRating, 0) / totalExchanges) * 100) / 100
      : 5.0;
    const smoothPercentage = totalExchanges > 0 
      ? Math.round((smoothExchanges / totalExchanges) * 100)
      : 100;

    return {
      totalExchanges,
      averageRating,
      smoothExchanges,
      smoothPercentage,
    };
  }
}