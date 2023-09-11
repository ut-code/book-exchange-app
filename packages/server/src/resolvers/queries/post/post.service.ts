// import { Injectable } from '@nestjs/common';
// import type { Post } from '@prisma/client';
// import { PrismaService } from 'src/services/prisma/prisma.service';

// @Injectable()
// export class PostService {
//   constructor(private readonly prisma: PrismaService) {}
//   async findMany(userId: string): Promise<Post[]> {
//     const posts = await this.prisma.post.findMany({
//       where: {
//         userId,
//       },
//     });
//     return posts;
//   }
// }
