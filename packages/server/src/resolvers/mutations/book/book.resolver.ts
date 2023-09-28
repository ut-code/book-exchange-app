import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Inject, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Book } from 'src/models/book';
import { CreateBookInput } from './book.input';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { User } from 'src/models/user';
import { PickPrimitive } from 'src/common/primitive';
import { RequestUser } from 'src/decorators/user/user.decorator';
import { AuthGuard } from 'src/services/auth/auth.guard';
import { z } from 'zod';

@UseGuards(AuthGuard)
@Resolver(Book)
export class BookResolver {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  @Mutation(() => Book)
  async createBook(
    @RequestUser() requestUser: User,
    @Args('input') input: CreateBookInput,
  ) {
    const inputSchema = z.object({
      title: z.string().nonempty('Title cannot be empty.'),
      description: z.string().optional(),
    });

    const validatedInput = inputSchema.safeParse(input);
    if (validatedInput.success === false) {
      throw new Error(validatedInput.error.message);
    }

    return this.prisma.book.create({
      data: {
        title: input.title,
        description: input.description,
        userId: requestUser.id,
      },
    });
  }

  @Mutation(() => [Book])
  async createBooks(
    @RequestUser() requestUser: User,
    @Args('input', { type: () => [CreateBookInput] }) input: CreateBookInput[],
  ) {
    const inputSchema = z.array(
      z.object({
        title: z.string().nonempty('Title cannot be empty.'),
        description: z.string().optional(),
      }),
    );

    const validatedInput = inputSchema.safeParse(input);
    if (validatedInput.success === false) {
      throw new Error(validatedInput.error.message);
    }

    return this.prisma.book.createMany({
      data: input.map((book) => ({
        title: book.title,
        description: book.description,
        userId: requestUser.id,
      })),
    });
  }

  @Mutation(() => Book)
  async updateBook(
    @RequestUser() requestUser: User,
    @Args('id') id: string,
    @Args('input') input: CreateBookInput,
  ) {
    const book = await this.prisma.book.findUnique({
      where: {
        id,
      },
    });
    if (book.userId !== requestUser.id) {
      throw new UnauthorizedException('Unauthorized');
    }
    return this.prisma.book.update({
      where: {
        id,
      },
      data: {
        title: input.title,
        description: input.description,
      },
    });
  }

  @Mutation(() => Book)
  async deleteBook(@RequestUser() requestUser: User, @Args('id') id: string) {
    const book = await this.prisma.book.delete({
      where: {
        id,
      },
    });
    if (book.userId !== requestUser.id) {
      throw new UnauthorizedException('Unauthorized');
    }
    return this.prisma.book.delete({
      where: {
        id,
      },
    });
  }

  @Mutation(() => [Book])
  async deleteBooks(
    @RequestUser() requestUser: User,
    @Args('ids', { type: () => [String] }) ids: string[],
  ) {
    const books = await this.prisma.book.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    if (books.some((book) => book.userId !== requestUser.id)) {
      throw new UnauthorizedException('Unauthorized');
    }
    return this.prisma.book.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
