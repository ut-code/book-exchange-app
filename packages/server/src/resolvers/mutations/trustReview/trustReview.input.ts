import { InputType, Field, Float } from '@nestjs/graphql';
import { TrustReviewType } from '../../../models/trustReview';

@InputType()
export class CreateTrustReviewInput {
  @Field(() => Float)
  rating!: number;

  @Field({ nullable: true })
  comment?: string;

  @Field(() => TrustReviewType)
  reviewType!: TrustReviewType;

  @Field()
  targetUserId!: string;

  @Field({ nullable: true })
  exchangeRequestId?: string;
}

@InputType()
export class UpdateTrustReviewInput {
  @Field()
  id!: string;

  @Field(() => Float, { nullable: true })
  rating?: number;

  @Field({ nullable: true })
  comment?: string;

  @Field(() => TrustReviewType, { nullable: true })
  reviewType?: TrustReviewType;
}