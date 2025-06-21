import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateBookTemplateInput {
  @Field()
  title!: string;

  @Field({ nullable: true })
  author?: string;

  @Field({ nullable: true })
  publisher?: string;

  @Field({ nullable: true })
  publishedDate?: string;

  @Field(() => Int, { nullable: true })
  pageCount?: number;

  @Field({ nullable: true })
  language?: string;

  @Field(() => [String], { nullable: true })
  categories?: string[];

  @Field({ nullable: true })
  imageUrl?: string;

  @Field({ nullable: true })
  infoLink?: string;

  @Field({ nullable: true })
  description?: string;
}