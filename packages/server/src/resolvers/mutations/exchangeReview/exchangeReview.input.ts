import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateExchangeReviewInput {
  @Field()
  exchangeRequestId: string;

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

  @Field({ description: 'Was the exchange smooth?', defaultValue: true })
  wasSmooth: boolean;
}

@InputType()
export class UpdateExchangeReviewInput {
  @Field()
  id: string;

  @Field(() => Int, { nullable: true, description: 'Smoothness rating (1-5)' })
  smoothness?: number;

  @Field(() => Int, { nullable: true, description: 'Communication rating (1-5)' })
  communication?: number;

  @Field(() => Int, { nullable: true, description: 'Punctuality rating (1-5)' })
  punctuality?: number;

  @Field(() => Int, { nullable: true, description: 'Book condition rating (1-5)' })
  bookCondition?: number;

  @Field(() => Int, { nullable: true, description: 'Overall rating (1-5)' })
  overallRating?: number;

  @Field({ nullable: true })
  comment?: string;

  @Field({ nullable: true, description: 'Was the exchange smooth?' })
  wasSmooth?: boolean;
}