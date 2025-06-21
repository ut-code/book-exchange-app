import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { Post } from 'src/models/post';
import { CreatePostInput } from './post.input';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { PickPrimitive } from 'src/common/primitive';
import { randomUUID } from 'crypto';

@Resolver(Post)
export class PostResolver {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  @Mutation(() => Post)
  async createPost(
    @Args('post') post: CreatePostInput,
  ): Promise<PickPrimitive<Post>> {
    return this.prisma.post.create({
      data: {
        id: randomUUID(),
        title: post.title,
        content: post.content,
        published: false,
        viewCount: 0,
        user: {},
      },
    });
  }

  @Mutation(() => Post)
  incrementPostViewCount(@Args('id') id: string): Promise<PickPrimitive<Post>> {
    return this.prisma.post.update({
      where: { id },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });
  }

  @Mutation(() => Post)
  async togglePublishPost(
    @Args('id') id: string,
  ): Promise<PickPrimitive<Post>> {
    const post = await this.prisma.post.findUnique({
      where: { id: id || undefined },
      select: {
        published: true,
      },
    });

    return this.prisma.post.update({
      where: { id: id || undefined },
      data: { published: !post?.published },
    });
  }

  @Mutation(() => Post)
  async deletePost(@Args('id') id: string): Promise<PickPrimitive<Post>> {
    return this.prisma.post.delete({
      where: {
        id,
      },
    });
  }
}
