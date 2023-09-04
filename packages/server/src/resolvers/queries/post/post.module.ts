import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/services/prisma/prisma.module';
import { PostResolver } from './post.resolver';

@Module({
  imports: [PrismaModule], // 他のモジュールをインポートする場合はこちらに
  providers: [PostResolver], // ResolverとPrismaServiceを提供
  exports: [], // 他のモジュールで使用するためのサービスやリゾルバーをエクスポートする場合はこちらに
})
export class PostModule {}
