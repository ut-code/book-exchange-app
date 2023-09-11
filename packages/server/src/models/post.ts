import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { User } from './user';

@ObjectType()
export class Post {
  @Field(() => ID)
  id!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;

  @Field()
  title!: string;

  @Field()
  content!: string;

  @Field()
  published!: boolean;

  @Field()
  viewCount!: number;

  @Field()
  userId!: string;

  @Field(() => User)
  user!: User;
}
