import { Module } from '@nestjs/common';
import { ExchangeHistoryResolver } from './exchangeHistory.resolver';
import { PrismaService } from '../../../services/prisma/prisma.service';

@Module({
  providers: [ExchangeHistoryResolver, PrismaService],
  exports: [ExchangeHistoryResolver],
})
export class ExchangeHistoryModule {}