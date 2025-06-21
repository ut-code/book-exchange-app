import { Module } from '@nestjs/common';
import { BookDatabaseMutationResolver } from './bookDatabase.resolver';
import { BookDatabaseModule } from '../../../services/book-database/book-database.module';

@Module({
  imports: [BookDatabaseModule],
  providers: [BookDatabaseMutationResolver],
})
export class BookDatabaseMutationModule {}