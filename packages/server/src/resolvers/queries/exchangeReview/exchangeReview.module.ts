import { Module } from '@nestjs/common';
import { ExchangeReviewQueryResolver } from './exchangeReview.query';
import { PrismaService } from '../../../services/prisma/prisma.service';

@Module({
  providers: [ExchangeReviewQueryResolver, PrismaService],
  exports: [ExchangeReviewQueryResolver],
})
export class ExchangeReviewQueryModule {}