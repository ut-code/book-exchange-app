import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from './user';

@ObjectType()
export class Book {
  @Field(() => ID)
  id!: string;

  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field()
  userId!: string;

  @Field(() => User)
  user!: User;
}
