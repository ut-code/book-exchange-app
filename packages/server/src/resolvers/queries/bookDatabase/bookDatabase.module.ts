import { Module } from '@nestjs/common';
import { BookDatabaseResolver } from './bookDatabase.resolver';
import { BookDatabaseModule } from '../../../services/book-database/book-database.module';

@Module({
  imports: [BookDatabaseModule],
  providers: [BookDatabaseResolver],
})
export class BookDatabaseResolverModule {}