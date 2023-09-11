import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from './user';

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
}
