import 'reflect-metadata';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { WantToRead } from 'src/models/wantToRead';
import { AddToWantToReadInput, RemoveFromWantToReadInput } from './wantToRead.input';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { RequestUser } from 'src/decorators/user/user.decorator';
import { User } from 'src/models/user';
import { AuthGuard } from 'src/services/auth/auth.guard';
import { randomUUID } from 'crypto';

@Resolver(WantToRead)
@UseGuards(AuthGuard)
export class WantToReadResolver {
  constructor(
    @Inject(PrismaService) private prismaService: PrismaService,
  ) {}

  @Mutation(() => WantToRead)
  async addToWantToRead(
    @Args('input') input: AddToWantToReadInput,
    @RequestUser() user: User,
  ) {
    // Check if already exists
    const existing = await this.prismaService.wantToRead.findUnique({
      where: {
        userId_bookTemplateId: {
          userId: user.id,
          bookTemplateId: input.bookTemplateId,
        },
      },
    });

    if (existing) {
      return existing;
    }

    return this.prismaService.wantToRead.create({
      data: {
        id: randomUUID(),
        userId: user.id,
        bookTemplateId: input.bookTemplateId,
      },
      include: {
        user: true,
        bookTemplate: true,
      },
    });
  }

  @Mutation(() => Boolean)
  async removeFromWantToRead(
    @Args('input') input: RemoveFromWantToReadInput,
    @RequestUser() user: User,
  ) {
    const deleted = await this.prismaService.wantToRead.deleteMany({
      where: {
        userId: user.id,
        bookTemplateId: input.bookTemplateId,
      },
    });

    return deleted.count > 0;
  }

  @Query(() => [WantToRead])
  async myWantToReadList(@RequestUser() user: User) {
    return this.prismaService.wantToRead.findMany({
      where: {
        userId: user.id,
      },
      include: {
        user: true,
        bookTemplate: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  @Query(() => Boolean)
  async isInWantToReadList(
    @Args('bookTemplateId') bookTemplateId: string,
    @RequestUser() user: User,
  ) {
    const wantToRead = await this.prismaService.wantToRead.findUnique({
      where: {
        userId_bookTemplateId: {
          userId: user.id,
          bookTemplateId: bookTemplateId,
        },
      },
    });

    return !!wantToRead;
  }
}