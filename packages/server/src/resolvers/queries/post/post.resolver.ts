import 'reflect-metadata';
import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { User } from 'src/models/user';
import { Post } from 'src/models/post';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { AuthGuard } from 'src/services/auth/auth.guard';
import { RequestUser } from 'src/decorators/user/user.decorator';
import { Book } from 'src/models/book';
import { PickPrimitive } from 'src/common/primitive';

@Resolver(Post)
export class PostResolver {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  @Query(() => Post)
  async post(@Args('id') id: string): Promise<PickPrimitive<Post>> {
    return this.prisma.post.findUnique({
      where: { id },
    });
  }

  @UseGuards(AuthGuard)
  @Query(() => [Post])
  async posts(
    @RequestUser() requestUser: User,
  ): Promise<PickPrimitive<Post>[]> {
    return this.prisma.post.findMany({
      where: {
        userId: requestUser.id,
      },
    });
  }

  @ResolveField(() => User)
  async user(@Parent() post: Post): Promise<PickPrimitive<User>> {
    return this.prisma.user.findUnique({
      where: { id: post.userId },
    });
  }

  @UseGuards(AuthGuard)
  @Query(() => [Post])
  allPosts(): Promise<PickPrimitive<Post>[]> {
    return this.prisma.post.findMany();
  }
}
