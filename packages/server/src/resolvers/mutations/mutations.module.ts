import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { TrustReviewModule } from './trustReview/trustReview.module';
import { BookDatabaseMutationModule } from './bookDatabase/bookDatabase.module';
import { ExchangeReviewModule } from './exchangeReview/exchangeReview.module';
import { WantToReadModule } from './wantToRead/wantToRead.module';
import { BookTemplateModule } from './bookTemplate/bookTemplate.module';

@Module({
  imports: [UserModule, PostModule, BookModule, TrustReviewModule, BookDatabaseMutationModule, ExchangeReviewModule, WantToReadModule, BookTemplateModule],
})
export class MutationsModule {}
