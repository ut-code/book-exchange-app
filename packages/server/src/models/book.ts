import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { User } from './user';
import { BookTemplate } from './bookTemplate';

export enum BookCondition {
  EXCELLENT = 'EXCELLENT',
  VERY_GOOD = 'VERY_GOOD',
  GOOD = 'GOOD',
  FAIR = 'FAIR',
  POOR = 'POOR',
}

registerEnumType(BookCondition, {
  name: 'BookCondition',
});

@ObjectType()
export class Book {
  @Field(() => ID)
  id!: string;

  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field(() => BookCondition)
  condition!: BookCondition;

  @Field()
  isAvailable!: boolean;

  @Field({ nullable: true })
  notes?: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;

  @Field()
  userId!: string;

  @Field(() => User)
  user!: User;

  @Field({ nullable: true })
  bookTemplateId?: string;

  @Field(() => BookTemplate, { nullable: true })
  bookTemplate?: BookTemplate;
}
