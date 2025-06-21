import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User } from './user';
import { TrustReview } from './trustReview';
import { ExchangeReview } from './exchangeReview';

export enum ExchangeStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  REJECTED = 'REJECTED',
}

registerEnumType(ExchangeStatus, {
  name: 'ExchangeStatus',
});

@ObjectType()
export class ExchangeRequest {
  @Field(() => ID)
  id!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;

  @Field()
  requesterUserId!: string;

  @Field(() => User)
  requesterUser!: User;

  @Field()
  addresseeUserId!: string;

  @Field(() => User)
  addresseeUser!: User;

  @Field(() => ExchangeStatus)
  status!: ExchangeStatus;

  @Field({ nullable: true })
  completedAt?: Date;

  @Field(() => [TrustReview])
  trustReviews!: TrustReview[];

  @Field(() => [ExchangeReview])
  exchangeReviews!: ExchangeReview[];
}
