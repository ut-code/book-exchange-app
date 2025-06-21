import { Module } from '@nestjs/common';
import { AchievementResolver } from './achievement.resolver';
import { AchievementService } from '../../../services/achievement/achievement.service';
import { PrismaService } from '../../../services/prisma/prisma.service';

@Module({
  providers: [AchievementResolver, AchievementService, PrismaService],
  exports: [AchievementResolver, AchievementService],
})
export class AchievementModule {}