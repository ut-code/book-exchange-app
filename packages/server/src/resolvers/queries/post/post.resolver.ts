import 'reflect-metadata';
import {
  Resolver,
  Query,
  Args,
  ResolveField,
  Parent,
  Info,
} from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { User } from 'src/models/user';
import { Post } from 'src/models/post';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { AuthGuard } from 'src/services/auth/auth.guard';
import { RequestUser } from 'src/decorators/user/user.decorator';
import { Book } from 'src/models/book';
import { PickPrimitive } from 'src/common/primitive';
import {
  getRequestedRelations,
  mapRelationsToPrismaInclude,
} from 'src/common/graphql';
import { GraphQLResolveInfo } from 'graphql';

@UseGuards(AuthGuard)
@Resolver(Post)
export class PostResolver {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  @Query(() => Post)
  async post(@Args('id') id: string, @Info() info: GraphQLResolveInfo) {
    return this.prisma.post.findUnique({
      where: { id },
      include: mapRelationsToPrismaInclude(
        getRequestedRelations<Post>(info, {
          user: {},
        }),
      ),
    });
  }

  @Query(() => [Post])
  async posts(
    @RequestUser() requestUser: User,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.prisma.post.findMany({
      where: {
        userId: requestUser.id,
      },
      include: mapRelationsToPrismaInclude(
        getRequestedRelations<Post>(info, {
          user: {},
        }),
      ),
    });
  }

  @ResolveField(() => User)
  async user(@Parent() post: Post): Promise<PickPrimitive<User>> {
    return this.prisma.user.findUnique({
      where: { id: post.userId },
    });
  }

  @Query(() => [Post])
  allPosts(@Info() info: GraphQLResolveInfo) {
    return this.prisma.post.findMany({
      include: mapRelationsToPrismaInclude(
        getRequestedRelations<Post>(info, {
          user: {},
        }),
      ),
    });
  }
}
