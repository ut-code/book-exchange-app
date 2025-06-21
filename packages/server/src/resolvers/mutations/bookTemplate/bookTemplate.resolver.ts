import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { BookTemplate } from 'src/models/bookTemplate';
import { UpdateBookTemplateInput } from './bookTemplate.input';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { User } from 'src/models/user';
import { RequestUser } from 'src/decorators/user/user.decorator';
import { AuthGuard } from 'src/services/auth/auth.guard';

@UseGuards(AuthGuard)
@Resolver(BookTemplate)
export class BookTemplateResolver {
  constructor(
    @Inject(PrismaService) private prisma: PrismaService,
  ) {}

  @Mutation(() => BookTemplate)
  async adminUpdateBookTemplate(
    @RequestUser() requestUser: User,
    @Args('bookTemplateId') bookTemplateId: string,
    @Args('input') input: UpdateBookTemplateInput,
  ) {
    // TODO: Add admin check
    // For now, allow any authenticated user to update book templates
    
    const bookTemplate = await this.prisma.bookTemplate.findUnique({
      where: { id: bookTemplateId },
    });

    if (!bookTemplate) {
      throw new Error('Book template not found');
    }

    return this.prisma.bookTemplate.update({
      where: { id: bookTemplateId },
      data: {
        title: input.title,
        author: input.author,
        publisher: input.publisher,
        publishedDate: input.publishedDate,
        pageCount: input.pageCount,
        language: input.language,
        categories: input.categories || [],
        imageUrl: input.imageUrl,
        infoLink: input.infoLink,
        description: input.description,
      },
      include: {
        books: true,
      },
    });
  }

  @Mutation(() => Boolean)
  async adminDeleteBookTemplate(
    @RequestUser() requestUser: User,
    @Args('bookTemplateId') bookTemplateId: string,
  ) {
    // TODO: Add admin check
    // For now, allow any authenticated user to delete book templates
    
    const bookTemplate = await this.prisma.bookTemplate.findUnique({
      where: { id: bookTemplateId },
      include: { books: true },
    });

    if (!bookTemplate) {
      throw new Error('Book template not found');
    }

    // Check if there are any books using this template
    if (bookTemplate.books.length > 0) {
      throw new Error('Cannot delete book template: there are books using this template');
    }

    await this.prisma.bookTemplate.delete({
      where: { id: bookTemplateId },
    });

    return true;
  }
}