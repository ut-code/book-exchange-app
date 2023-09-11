import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Book } from './book';
import { ExchangeRequest } from './exchangeRequest';
import { Post } from './post';

@ObjectType()
export class User {
  @Field(() => ID)
  id!: string;

  @Field()
  username!: string;

  @Field()
  password!: string;

  @Field()
  hashedPassword!: string;

  @Field(() => [Post])
  posts!: Post[];

  @Field(() => [Book])
  books!: Book[];

  @Field(() => [ExchangeRequest])
  requesterExchangeRequest!: ExchangeRequest[];

  @Field(() => [ExchangeRequest])
  addresseeExchangeRequest!: ExchangeRequest[];
}
