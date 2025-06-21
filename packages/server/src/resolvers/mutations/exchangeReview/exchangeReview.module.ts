import { Module } from '@nestjs/common';
import { ExchangeReviewResolver } from './exchangeReview.resolver';
import { PrismaService } from '../../../services/prisma/prisma.service';
import { TrustScoreService } from '../../../services/trustScore.service';

@Module({
  providers: [ExchangeReviewResolver, PrismaService, TrustScoreService],
  exports: [ExchangeReviewResolver],
})
export class ExchangeReviewModule {}