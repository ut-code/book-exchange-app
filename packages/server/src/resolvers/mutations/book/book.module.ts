import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/services/prisma/prisma.module';
import { GoogleBooksModule } from 'src/services/google-books/google-books.module';
import { BookResolver } from './book.resolver';

@Module({
  imports: [PrismaModule, GoogleBooksModule], // 他のモジュールをインポートする場合はこちらに
  providers: [BookResolver], // ResolverとPrismaServiceを提供
  exports: [], // 他のモジュールで使用するためのサービスやリゾルバーをエクスポートする場合はこちらに
})
export class BookModule {}
