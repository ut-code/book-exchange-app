import { Module } from '@nestjs/common';
import { AuthModule } from 'src/services/auth/auth.module';
import { PrismaModule } from 'src/services/prisma/prisma.module';
import { UserResolver } from './user.resolver';

@Module({
  imports: [PrismaModule, AuthModule], // 他のモジュールをインポートする場合はこちらに
  providers: [UserResolver], // ResolverとPrismaServiceを提供
  exports: [], // 他のモジュールで使用するためのサービスやリゾルバーをエクスポートする場合はこちらに
})
export class UserModule {}
