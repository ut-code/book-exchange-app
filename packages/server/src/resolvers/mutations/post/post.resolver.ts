import 'reflect-metadata';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { Post } from 'src/models/post';
import { PostCreateInput } from './post.input';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Resolver(Post)
export class PostResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @Mutation(() => Post)
  createPost(@Args('data') data: PostCreateInput) {
    return this.prismaService.post.create({
      data,
    });
  }

  @Mutation(() => Post)
  incrementPostViewCount(@Args('id') id: string): Promise<Post> {
    return this.prismaService.post.update({
      where: { id },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });
  }

  @Mutation(() => Post)
  async togglePublishPost(@Args('id') id: string): Promise<Post | null> {
    const post = await this.prismaService.post.findUnique({
      where: { id: id || undefined },
      select: {
        published: true,
      },
    });

    return this.prismaService.post.update({
      where: { id: id || undefined },
      data: { published: !post?.published },
    });
  }

  @Mutation(() => Post)
  async deletePost(@Args('id') id: string): Promise<Post | null> {
    return this.prismaService.post.delete({
      where: {
        id,
      },
    });
  }
}
