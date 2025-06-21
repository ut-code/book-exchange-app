import { ObjectType, Field, ID, Float, registerEnumType } from '@nestjs/graphql';
import { User } from './user';
import { ExchangeRequest } from './exchangeRequest';

export enum TrustReviewType {
  EXCHANGE_COMPLETION = 'EXCHANGE_COMPLETION',
  COMMUNICATION_QUALITY = 'COMMUNICATION_QUALITY',
  ITEM_CONDITION = 'ITEM_CONDITION',
  PUNCTUALITY = 'PUNCTUALITY',
  GENERAL = 'GENERAL',
}

registerEnumType(TrustReviewType, {
  name: 'TrustReviewType',
});

@ObjectType()
export class TrustReview {
  @Field(() => ID)
  id!: string;

  @Field(() => Float)
  rating!: number;

  @Field({ nullable: true })
  comment?: string;

  @Field(() => TrustReviewType)
  reviewType!: TrustReviewType;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;

  @Field(() => User)
  reviewerUser!: User;

  @Field()
  reviewerUserId!: string;

  @Field(() => User)
  targetUser!: User;

  @Field()
  targetUserId!: string;

  @Field(() => ExchangeRequest, { nullable: true })
  exchangeRequest?: ExchangeRequest;

  @Field({ nullable: true })
  exchangeRequestId?: string;
}