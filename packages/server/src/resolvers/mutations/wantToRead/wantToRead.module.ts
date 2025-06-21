import { Module } from '@nestjs/common';
import { WantToReadResolver } from './wantToRead.resolver';
import { PrismaModule } from 'src/services/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [WantToReadResolver],
})
export class WantToReadModule {}