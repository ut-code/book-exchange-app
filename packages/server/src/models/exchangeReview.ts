import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { User } from './user';
import { ExchangeRequest } from './exchangeRequest';

@ObjectType()
export class ExchangeReview {
  @Field(() => ID)
  id: string;

  @Field(() => ExchangeRequest)
  exchangeRequest: ExchangeRequest;

  @Field()
  exchangeRequestId: string;

  @Field(() => User)
  reviewer: User;

  @Field()
  reviewerUserId: string;

  @Field(() => User)
  reviewed: User;

  @Field()
  reviewedUserId: string;

  @Field(() => Int, { description: 'Smoothness rating (1-5)' })
  smoothness: number;

  @Field(() => Int, { description: 'Communication rating (1-5)' })
  communication: number;

  @Field(() => Int, { description: 'Punctuality rating (1-5)' })
  punctuality: number;

  @Field(() => Int, { description: 'Book condition rating (1-5)' })
  bookCondition: number;

  @Field(() => Int, { description: 'Overall rating (1-5)' })
  overallRating: number;

  @Field({ nullable: true })
  comment?: string;

  @Field({ description: 'Was the exchange smooth?' })
  wasSmooth: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}