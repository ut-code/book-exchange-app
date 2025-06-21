import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { User } from './user';

@ObjectType()
export class TrustScoreHistory {
  @Field(() => ID)
  id!: string;

  @Field(() => Float)
  oldScore!: number;

  @Field(() => Float)
  newScore!: number;

  @Field()
  reason!: string;

  @Field()
  createdAt!: Date;

  @Field(() => User)
  user!: User;

  @Field()
  userId!: string;
}