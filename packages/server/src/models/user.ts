import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { Book } from './book';
import { ExchangeRequest } from './exchangeRequest';
import { Post } from './post';
import { TrustReview } from './trustReview';
import { TrustScoreHistory } from './trustScoreHistory';

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

  @Field(() => Float, { defaultValue: 5.0 })
  trustScore!: number;

  @Field(() => [Post])
  posts!: Post[];

  @Field(() => [Book])
  books!: Book[];

  @Field(() => [ExchangeRequest])
  requesterExchangeRequest!: ExchangeRequest[];

  @Field(() => [ExchangeRequest])
  addresseeExchangeRequest!: ExchangeRequest[];

  @Field(() => [TrustScoreHistory])
  trustScoreHistory!: TrustScoreHistory[];

  @Field(() => [TrustReview])
  receivedTrustReviews!: TrustReview[];

  @Field(() => [TrustReview])
  givenTrustReviews!: TrustReview[];
}
