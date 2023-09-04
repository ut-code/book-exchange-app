import {
  Resolver,
  Args,
  Root,
  Query,
  ResolveField,
  Context,
  Parent,
} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { User } from 'src/models/user';
import { Post } from 'src/models/post';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Resolver(User)
export class UserResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @ResolveField(() => [Post])
  posts(@Parent() user: User): Promise<Post[]> {
    return this.prismaService.user
      .findUnique({
        where: {
          id: user.id,
        },
      })
      .posts();
  }

  @Query(() => [User])
  async users() {
    return this.prismaService.user.findMany();
  }

  @Query(() => [Post])
  async draftsByUser(@Args('id') id: string): Promise<Post[]> {
    return this.prismaService.user
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
