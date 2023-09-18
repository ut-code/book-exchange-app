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
@Resolver(Book)
export class BookResolver {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  @Query(() => Book)
  async book(@Args('id') id: string, @Info() info: GraphQLResolveInfo) {
    return this.prisma.book.findUnique({
      where: { id },
      include: mapRelationsToPrismaInclude(
        getRequestedRelations<Book>(info, {
          user: {},
        }),
      ),
    });
  }

  @Query(() => [Book])
  async books(
    @RequestUser() requestUser: User,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.prisma.book.findMany({
      where: {
        userId: requestUser.id,
      },
      include: mapRelationsToPrismaInclude(
        getRequestedRelations<Book>(info, {
          user: {},
        }),
      ),
    });
  }

  @Query(() => [Book])
  async booksByUserId(
    @Args('userId') userId: string,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.prisma.book.findMany({
      where: {
        userId,
      },
      include: mapRelationsToPrismaInclude(
        getRequestedRelations<Book>(info, {
          user: {},
        }),
      ),
    });
  }

  @ResolveField(() => User)
  async user(@Parent() book: Book): Promise<PickPrimitive<User>> {
    return this.prisma.user.findUnique({
      where: { id: book.userId },
    });
  }

  @Query(() => [Book])
  allBooks(@Info() info: GraphQLResolveInfo) {
    return this.prisma.book.findMany({
      include: mapRelationsToPrismaInclude(
        getRequestedRelations<Book>(info, {
          user: {},
        }),
      ),
    });
  }
}
