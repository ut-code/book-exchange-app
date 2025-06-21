import 'reflect-metadata';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { User } from 'src/models/user';
import { CreateUserInput, SigninUserInput, AdminUpdateUserInput } from './user.input';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { AuthService } from 'src/services/auth/auth.service';
import { AuthResponse } from 'src/services/auth/auth.output';
import * as bcrypt from 'bcrypt';
import { PickPrimitive } from 'src/common/primitive';
import { RequestUser } from 'src/decorators/user/user.decorator';
import { randomUUID } from 'crypto';

const saltRounds = 10;

@Resolver(User)
export class UserResolver {
  constructor(
    @Inject(PrismaService) private prismaService: PrismaService,
    @Inject(AuthService) private authService: AuthService,
    @Inject(PrismaService) private prisma: PrismaService,
  ) {}

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput) {
    const hash = await bcrypt.hash(input.password, saltRounds);

    return this.prismaService.user.create({
      data: {
        id: randomUUID(),
        username: input.username,
        password: input.password,
        hashedPassword: hash,
      },
    });
  }

  // update

  // delete 論理削除
  @Mutation(() => User)
  async deleteUser(@RequestUser() requestUser: User) {
    return this.prisma.user.update({
      where: {
        id: requestUser.id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  @Mutation(() => AuthResponse)
  async signinUser(@Args('input') input: SigninUserInput) {
    return this.authService.signIn(input.username, input.password);
  }

  // Admin-only user management
  @Mutation(() => Boolean)
  async adminDeleteUser(
    @RequestUser() requestUser: User,
    @Args('userId') userId: string,
  ) {
    // TODO: Add admin check
    // For now, allow any authenticated user to delete users
    
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Soft delete
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        deletedAt: new Date(),
      },
    });

    return true;
  }

  @Mutation(() => User)
  async adminUpdateUser(
    @RequestUser() requestUser: User,
    @Args('userId') userId: string,
    @Args('input') input: AdminUpdateUserInput,
  ) {
    // TODO: Add admin check
    // For now, allow any authenticated user to update users
    
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        username: input.username ?? user.username,
        trustScore: input.trustScore ?? user.trustScore,
      },
    });
  }
}
