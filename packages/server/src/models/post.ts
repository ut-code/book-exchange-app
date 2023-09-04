import 'reflect-metadata';
import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { User } from './user';

@ObjectType()
export class Post {
  @Field(() => ID)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field()
  title: string;

  @Field(() => String, { nullable: true })
  content: string | null;

  @Field(() => Boolean, { nullable: true })
  published?: boolean | null;

  @Field(() => Int)
  viewCount: number;

  @Field(() => User, { nullable: true })
  author?: User | null;
}
