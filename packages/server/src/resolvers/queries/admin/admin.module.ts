import { Module } from '@nestjs/common';
import { AdminResolver } from './admin.resolver';
import { PrismaService } from '../../../services/prisma/prisma.service';

@Module({
  providers: [AdminResolver, PrismaService],
  exports: [AdminResolver],
})
export class AdminModule {}