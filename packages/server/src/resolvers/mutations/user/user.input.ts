import { InputType, PickType, Field } from '@nestjs/graphql';
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

@InputType()
export class AdminUpdateUserInput {
  @Field({ nullable: true })
  username?: string;
  
  @Field({ nullable: true })
  trustScore?: number;
}
