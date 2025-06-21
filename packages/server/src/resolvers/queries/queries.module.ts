import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { BookDatabaseResolverModule } from './bookDatabase/bookDatabase.module';
import { BookTemplateModule } from './bookTemplate/bookTemplate.module';
import { ExchangeReviewQueryModule } from './exchangeReview/exchangeReview.module';
import { WantToReadModule } from '../mutations/wantToRead/wantToRead.module';
import { AdminModule } from './admin/admin.module';
import { ExchangeHistoryModule } from './exchangeHistory/exchangeHistory.module';
import { AchievementModule } from './achievement/achievement.module';

@Module({
  imports: [UserModule, PostModule, BookModule, BookDatabaseResolverModule, BookTemplateModule, ExchangeReviewQueryModule, WantToReadModule, AdminModule, ExchangeHistoryModule, AchievementModule],
})
export class QueriesModule {}
