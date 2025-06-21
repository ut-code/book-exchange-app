import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BadgeType, ExchangeHistoryStatus } from '@prisma/client';
import { randomUUID } from 'crypto';

@Injectable()
export class AchievementService {
  constructor(private readonly prisma: PrismaService) {}

  async checkAndAwardAchievements(userId: string): Promise<void> {
    // Get user's current achievements
    const existingAchievements = await this.prisma.userAchievement.findMany({
      where: { userId },
      include: { badge: true },
    });

    const existingBadgeTypes = existingAchievements.map(achievement => achievement.badge.type);

    // Check exchange-based achievements
    await this.checkExchangeAchievements(userId, existingBadgeTypes);
    
    // Check book collection achievements
    await this.checkBookCollectionAchievements(userId, existingBadgeTypes);
    
    // Check review achievements
    await this.checkReviewAchievements(userId, existingBadgeTypes);
    
    // Check trust score achievements
    await this.checkTrustScoreAchievements(userId, existingBadgeTypes);
  }

  private async checkExchangeAchievements(userId: string, existingBadgeTypes: BadgeType[]): Promise<void> {
    const completedExchanges = await this.prisma.exchangeHistory.count({
      where: {
        OR: [
          { requesterId: userId },
          { recipientId: userId },
        ],
        status: ExchangeHistoryStatus.COMPLETED,
      },
    });

    const exchangeMilestones = [
      { count: 1, badgeType: BadgeType.FIRST_EXCHANGE },
      { count: 5, badgeType: BadgeType.FIVE_EXCHANGES },
      { count: 10, badgeType: BadgeType.TEN_EXCHANGES },
      { count: 25, badgeType: BadgeType.TWENTY_FIVE_EXCHANGES },
      { count: 50, badgeType: BadgeType.FIFTY_EXCHANGES },
      { count: 100, badgeType: BadgeType.HUNDRED_EXCHANGES },
    ];

    for (const milestone of exchangeMilestones) {
      if (completedExchanges >= milestone.count && !existingBadgeTypes.includes(milestone.badgeType)) {
        await this.awardBadge(userId, milestone.badgeType);
      }
    }
  }

  private async checkBookCollectionAchievements(userId: string, existingBadgeTypes: BadgeType[]): Promise<void> {
    const bookCount = await this.prisma.book.count({
      where: { userId },
    });

    if (bookCount >= 20 && !existingBadgeTypes.includes(BadgeType.BOOK_COLLECTOR)) {
      await this.awardBadge(userId, BadgeType.BOOK_COLLECTOR);
    }
  }

  private async checkReviewAchievements(userId: string, existingBadgeTypes: BadgeType[]): Promise<void> {
    const reviewCount = await this.prisma.trustReview.count({
      where: { reviewerUserId: userId },
    });

    if (reviewCount >= 10 && !existingBadgeTypes.includes(BadgeType.HELPFUL_REVIEWER)) {
      await this.awardBadge(userId, BadgeType.HELPFUL_REVIEWER);
    }
  }

  private async checkTrustScoreAchievements(userId: string, existingBadgeTypes: BadgeType[]): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { trustScore: true },
    });

    if (user && user.trustScore === 5.0 && !existingBadgeTypes.includes(BadgeType.PERFECT_RATING)) {
      const reviewCount = await this.prisma.trustReview.count({
        where: { targetUserId: userId },
      });

      // Only award perfect rating if user has at least 5 reviews
      if (reviewCount >= 5) {
        await this.awardBadge(userId, BadgeType.PERFECT_RATING);
      }
    }
  }

  private async awardBadge(userId: string, badgeType: BadgeType): Promise<void> {
    try {
      // Find the badge
      const badge = await this.prisma.achievementBadge.findUnique({
        where: { type: badgeType },
      });

      if (!badge) {
        console.error(`Badge not found for type: ${badgeType}`);
        return;
      }

      // Award the badge to the user
      await this.prisma.userAchievement.create({
        data: {
          id: randomUUID(),
          userId,
          badgeId: badge.id,
        },
      });

      console.log(`Awarded badge ${badgeType} to user ${userId}`);
    } catch (error) {
      console.error(`Error awarding badge ${badgeType} to user ${userId}:`, error);
    }
  }

  async initializeBadges(): Promise<void> {
    const badges = [
      {
        type: BadgeType.FIRST_EXCHANGE,
        name: '初回交換',
        description: '最初の本交換を完了しました',
        iconUrl: '/badges/first-exchange.png',
      },
      {
        type: BadgeType.FIVE_EXCHANGES,
        name: '交換マスター',
        description: '5回の本交換を完了しました',
        iconUrl: '/badges/five-exchanges.png',
      },
      {
        type: BadgeType.TEN_EXCHANGES,
        name: '交換エキスパート',
        description: '10回の本交換を完了しました',
        iconUrl: '/badges/ten-exchanges.png',
      },
      {
        type: BadgeType.TWENTY_FIVE_EXCHANGES,
        name: '交換チャンピオン',
        description: '25回の本交換を完了しました',
        iconUrl: '/badges/twenty-five-exchanges.png',
      },
      {
        type: BadgeType.FIFTY_EXCHANGES,
        name: '交換ヒーロー',
        description: '50回の本交換を完了しました',
        iconUrl: '/badges/fifty-exchanges.png',
      },
      {
        type: BadgeType.HUNDRED_EXCHANGES,
        name: '交換レジェンド',
        description: '100回の本交換を完了しました',
        iconUrl: '/badges/hundred-exchanges.png',
      },
      {
        type: BadgeType.PERFECT_RATING,
        name: '完璧な評価',
        description: '5.0の信頼スコアを維持しています',
        iconUrl: '/badges/perfect-rating.png',
      },
      {
        type: BadgeType.HELPFUL_REVIEWER,
        name: '親切なレビュアー',
        description: '10件のレビューを投稿しました',
        iconUrl: '/badges/helpful-reviewer.png',
      },
      {
        type: BadgeType.BOOK_COLLECTOR,
        name: 'ブックコレクター',
        description: '20冊以上の本を登録しました',
        iconUrl: '/badges/book-collector.png',
      },
      {
        type: BadgeType.EARLY_ADOPTER,
        name: 'アーリーアダプター',
        description: 'サービス開始初期からのユーザーです',
        iconUrl: '/badges/early-adopter.png',
      },
      {
        type: BadgeType.COMMUNITY_HELPER,
        name: 'コミュニティヘルパー',
        description: 'コミュニティに積極的に貢献しています',
        iconUrl: '/badges/community-helper.png',
      },
    ];

    for (const badgeData of badges) {
      await this.prisma.achievementBadge.upsert({
        where: { type: badgeData.type },
        update: badgeData,
        create: {
          id: randomUUID(),
          ...badgeData,
        },
      });
    }
  }
}