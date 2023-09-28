import {
  Resolver,
  Args,
  Root,
  Query,
  ResolveField,
  Context,
  Parent,
  Info,
} from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { User } from 'src/models/user';
import { Post } from 'src/models/post';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { PickPrimitive } from 'src/common/primitive';
import {
  getRequestedRelations,
  mapRelationsToPrismaInclude,
} from 'src/common/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { AuthGuard } from 'src/services/auth/auth.guard';
import { RequestUser } from 'src/decorators/user/user.decorator';
@UseGuards(AuthGuard)
@Resolver(User)
export class UserResolver {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  @Query(() => User)
  async user(
    @RequestUser() requestUser: User,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.prisma.user.findUnique({
      where: { id: requestUser.id },
      include: mapRelationsToPrismaInclude(
        getRequestedRelations<User>(info, {
          posts: {},
          books: {},
          requesterExchangeRequest: {},
          addresseeExchangeRequest: {},
        }),
      ),
    });
  }

  @Query(() => [User])
  async users(@Info() info: GraphQLResolveInfo) {
    const includeRelations = mapRelationsToPrismaInclude(
      getRequestedRelations<User>(info, {
        posts: {},
        books: {},
        requesterExchangeRequest: {},
        addresseeExchangeRequest: {},
      }),
    );
    return this.prisma.user.findMany({
      include: includeRelations,
    });
  }

  @ResolveField(() => [Post])
  async posts(@Parent() user: User) {
    return this.prisma.post.findMany({
      where: { userId: user.id },
    });
  }

  @Query(() => [Post])
  async draftsByUser(@Args('id') id: string) {
    return this.prisma.user
      .findUnique({
        where: {
          id,
        },
      })
      .posts({
        where: {
          published: false,
        },
      });
  }
}
