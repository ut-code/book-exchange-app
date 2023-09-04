import { InputType, PickType } from '@nestjs/graphql';
import { Post } from 'src/models/post';

@InputType()
export class PostCreateInput extends PickType(
  Post,
  ['title', 'content'],
  InputType,
) {}
