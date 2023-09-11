import 'reflect-metadata';
import {
  Resolver,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { User } from 'src/models/user';
import { UserInput } from './user.input';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { AuthService } from 'src/services/auth/auth.service';
import { AuthResponse } from 'src/services/auth/auth.output';
import * as bcrypt from 'bcrypt';
import { Post } from 'src/models/post';
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
  async signUp(@Args('input') input: UserInput): Promise<PickPrimitive<User>> {
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
  async signIn(@Args('input') input: UserInput): Promise<PickPrimitive<User>> {
    return this.authService.signIn(input.username, input.password);
  }

  @ResolveField(() => [Post])
  async posts(@Parent() user: User): Promise<PickPrimitive<Post>[]> {
    return this.prisma.post.findMany({
      where: { userId: user.id },
    });
  }
}
