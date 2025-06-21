import { Module } from '@nestjs/common';
import { BookTemplateResolver } from './bookTemplate.resolver';
import { PrismaModule } from '../../../services/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [BookTemplateResolver],
})
export class BookTemplateModule {}