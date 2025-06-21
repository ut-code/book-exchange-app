import { Resolver, Query, Args, Context, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../../services/auth/auth.guard';
import { PrismaService } from '../../../services/prisma/prisma.service';
import { AchievementBadge, UserAchievement } from '../../../models/achievementBadge';
import { AchievementService } from '../../../services/achievement/achievement.service';
import { randomUUID } from 'crypto';

@Resolver(() => AchievementBadge)
export class AchievementResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly achievementService: AchievementService,
  ) {}

  @Query(() => [AchievementBadge])
  async getAllBadges(): Promise<AchievementBadge[]> {
    return this.prisma.achievementBadge.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'asc' },
    }) as any;
  }

  @UseGuards(AuthGuard)
  @Query(() => [UserAchievement])
  async getMyAchievements(@Context() context: any): Promise<UserAchievement[]> {
    const userId = context.req.user.sub;
    
    return this.prisma.userAchievement.findMany({
      where: { userId },
      include: {
        badge: true,
      },
      orderBy: { earnedAt: 'desc' },
    }) as any;
  }

  @UseGuards(AuthGuard)
  @Query(() => [UserAchievement])
  async getUserAchievements(@Args('userId') userId: string): Promise<UserAchievement[]> {
    return this.prisma.userAchievement.findMany({
      where: { userId },
      include: {
        badge: true,
      },
      orderBy: { earnedAt: 'desc' },
    }) as any;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async checkAndAwardAchievements(@Context() context: any): Promise<boolean> {
    const userId = context.req.user.sub;
    await this.achievementService.checkAndAwardAchievements(userId);
    return true;
  }
}