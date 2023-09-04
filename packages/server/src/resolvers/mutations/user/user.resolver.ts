import 'reflect-metadata';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { User } from 'src/models/user';
import { UserInput } from './user.input';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { AuthService } from 'src/services/auth/auth.service';
import { AuthResponse } from 'src/services/auth/auth.output';
import * as bcrypt from 'bcrypt';

const saltRounds = 10;

@Resolver(User)
export class UserResolver {
  constructor(
    @Inject(PrismaService) private prismaService: PrismaService,
    @Inject(AuthService) private authService: AuthService,
  ) {}

  @Mutation(() => User)
  async signUp(@Args('input') input: UserInput) {
    const hash = await bcrypt.hash(input.password, saltRounds);

    return this.prismaService.user.create({
      data: {
        username: input.username,
        password: input.password,
        hashedPassword: hash,
      },
    });
  }

  @Mutation(() => AuthResponse)
  async signIn(@Args('input') input: UserInput) {
    return this.authService.signIn(input.username, input.password);
  }
}
