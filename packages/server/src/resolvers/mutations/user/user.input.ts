import { InputType, PickType } from '@nestjs/graphql';
import { User } from 'src/models/user';

@InputType()
export class UserInput extends PickType(
  User,
  ['username', 'password'],
  InputType,
) {}
