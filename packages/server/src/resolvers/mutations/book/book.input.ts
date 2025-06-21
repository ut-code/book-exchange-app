import { InputType, Field } from '@nestjs/graphql';
import { BookCondition } from 'src/models/book';

@InputType()
export class CreateBookInput {
  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field(() => BookCondition, { defaultValue: BookCondition.GOOD })
  condition!: BookCondition;

  @Field({ defaultValue: true })
  isAvailable!: boolean;

  @Field({ nullable: true })
  notes?: string;

  @Field({ nullable: true })
  bookTemplateId?: string;
}

@InputType()
export class CreateBookFromTemplateInput {
  @Field()
  bookTemplateId!: string;

  @Field(() => BookCondition, { defaultValue: BookCondition.GOOD })
  condition!: BookCondition;

  @Field({ defaultValue: true })
  isAvailable!: boolean;

  @Field({ nullable: true })
  notes?: string;

  @Field({ nullable: true })
  customDescription?: string;
}

@InputType()
export class CreateBookFromIsbnInput {
  @Field()
  isbn!: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => BookCondition, { defaultValue: BookCondition.GOOD })
  condition!: BookCondition;

  @Field({ defaultValue: true })
  isAvailable!: boolean;

  @Field({ nullable: true })
  notes?: string;
}

@InputType()
export class ToggleBookOwnershipInput {
  @Field()
  bookTemplateId!: string;
}
