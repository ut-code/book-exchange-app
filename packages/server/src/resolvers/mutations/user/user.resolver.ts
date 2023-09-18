import 'reflect-metadata';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { User } from 'src/models/user';
import { CreateUserInput, SigninUserInput } from './user.input';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { AuthService } from 'src/services/auth/auth.service';
import { AuthResponse } from 'src/services/auth/auth.output';
import * as bcrypt from 'bcrypt';
import { PickPrimitive } from 'src/common/primitive';

const saltRounds = 10;

@Resolver(User)
export class UserResolver {
  constructor(
    @Inject(PrismaService) private prismaService: PrismaService,
    @Inject(AuthService) private authService: AuthService,
    @Inject(PrismaService) private prisma: PrismaService,
  ) {}

  @Mutation(() => User)
  async createUser(
    @Args('input') input: CreateUserInput,
  ): Promise<PickPrimitive<User>> {
    const hash = await bcrypt.hash(input.password, saltRounds);

    return this.prismaService.user.create({
      data: {
        username: input.username,
        password: input.password,
        hashedPassword: hash,
      },
    });
  }

  // update

  // delete

  @Mutation(() => AuthResponse)
  async signinUser(
    @Args('input') input: SigninUserInput,
  ): Promise<PickPrimitive<AuthResponse>> {
    return this.authService.signIn(input.username, input.password);
  }
}
