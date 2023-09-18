import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, PostModule, BookModule],
})
export class QueriesModule {}
