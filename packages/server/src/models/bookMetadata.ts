import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class BookMetadata {
  @Field()
  isbn!: string;

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

  @Field(() => [String], { defaultValue: [] })
  categories?: string[];

  @Field({ nullable: true })
  imageUrl?: string;

  @Field({ nullable: true })
  infoLink?: string;

  @Field({ nullable: true })
  description?: string;
}