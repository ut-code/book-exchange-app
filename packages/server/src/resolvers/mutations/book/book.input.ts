import { InputType, PickType } from '@nestjs/graphql';
import { Book } from 'src/models/Book';

@InputType()
export class CreateBookInput extends PickType(
  Book,
  ['title', 'description'],
  InputType,
) {}
