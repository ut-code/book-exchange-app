import { Module } from '@nestjs/common';
import { BookDatabaseService } from './book-database.service';
import { PrismaModule } from '../prisma/prisma.module';
import { GoogleBooksModule } from '../google-books/google-books.module';

@Module({
  imports: [PrismaModule, GoogleBooksModule],
  providers: [BookDatabaseService],
  exports: [BookDatabaseService],
})
export class BookDatabaseModule {}