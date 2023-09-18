import { InputType, PickType } from '@nestjs/graphql';
import { User } from 'src/models/user';

@InputType()
export class CreateUserInput extends PickType(
  User,
  ['username', 'password'],
  InputType,
) {}

@InputType()
export class SigninUserInput extends PickType(
  User,
  ['username', 'password'],
  InputType,
) {}
