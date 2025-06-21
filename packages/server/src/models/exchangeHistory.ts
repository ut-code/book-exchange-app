import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { User } from './user';
import { Book } from './book';

export enum ExchangeHistoryStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

registerEnumType(ExchangeHistoryStatus, {
  name: 'ExchangeHistoryStatus',
});

@ObjectType()
export class ExchangeHistory {
  @Field(() => ID)
  id: string;

  @Field(() => User)
  requester: User;

  @Field()
  requesterId: string;

  @Field(() => User)
  recipient: User;

  @Field()
  recipientId: string;

  @Field(() => Book)
  requestedBook: Book;

  @Field()
  requestedBookId: string;

  @Field(() => Book, { nullable: true })
  offeredBook?: Book;

  @Field({ nullable: true })
  offeredBookId?: string;

  @Field(() => ExchangeHistoryStatus)
  status: ExchangeHistoryStatus;

  @Field({ nullable: true })
  message?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  completedAt?: Date;
}