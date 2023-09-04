// prisma.module.ts

import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // これにより、PrismaService は全体的に一度だけインスタンス化され、他のモジュールで再利用できるようになります。
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // 他のモジュールで PrismaService を使いたい場合にエクスポートします。
})
export class PrismaModule {}
