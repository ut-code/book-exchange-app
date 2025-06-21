import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AddToWantToReadInput {
  @Field()
  bookTemplateId!: string;
}

@InputType()
export class RemoveFromWantToReadInput {
  @Field()
  bookTemplateId!: string;
}