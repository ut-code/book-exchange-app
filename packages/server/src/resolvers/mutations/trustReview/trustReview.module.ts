import { Module } from '@nestjs/common';
import { TrustReviewResolver } from './trustReview.resolver';
import { PrismaModule } from '../../../services/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [TrustReviewResolver],
})
export class TrustReviewModule {}