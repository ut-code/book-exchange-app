import 'reflect-metadata';
import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { User } from 'src/models/user';
import { Post } from 'src/models/post';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { AuthGuard } from 'src/services/auth/auth.guard';
import { RequestUser } from 'src/decorators/user/user.decorator';

@Resolver(Post)
export class PostResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @ResolveField()
  author(@Parent() post: Post): Promise<User | null> {
    return this.prismaService.post
      .findUnique({
        where: {
          id: post.id,
        },
      })
      .user();
  }

  @Query(() => Post)
  post(@Args('id') id: string) {
    return this.prismaService.post.findUnique({
      where: { id },
    });
  }

  @UseGuards(AuthGuard)
  @Query(() => [Post])
  posts(@RequestUser() requestUser: User) {
    return this.prismaService.post.findMany({
      where: {
        userId: requestUser.id,
      },
    });
  }

  @UseGuards(AuthGuard)
  @Query(() => [Post])
  allPosts() {
    return this.prismaService.post.findMany();
  }
}
