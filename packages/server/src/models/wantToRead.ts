import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from './user';
import { BookTemplate } from './bookTemplate';

@ObjectType()
export class WantToRead {
  @Field(() => ID)
  id!: string;

  @Field()
  userId!: string;

  @Field()
  bookTemplateId!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;

  @Field(() => User)
  user!: User;

  @Field(() => BookTemplate)
  bookTemplate!: BookTemplate;
}