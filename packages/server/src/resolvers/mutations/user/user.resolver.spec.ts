import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { AuthService } from 'src/services/auth/auth.service';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('UserResolver', () => {
  let resolver: UserResolver;
  let prismaService: any;
  let authService: any;

  const mockUser = {
    id: 'user1',
    username: 'testuser',
    password: 'plainPassword',
    hashedPassword: 'hashedPassword',
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn(),
              update: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    prismaService = module.get(PrismaService);
    authService = module.get(AuthService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user successfully', async () => {
      const input = {
        username: 'newuser',
        password: 'password123',
      };

      const hashedPassword = 'hashedPassword123';
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      prismaService.user.create.mockResolvedValue({
        ...mockUser,
        username: input.username,
        hashedPassword,
      });

      const result = await resolver.createUser(input);

      expect(result.username).toBe(input.username);
      expect(bcrypt.hash).toHaveBeenCalledWith(input.password, 10);
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: {
          id: expect.any(String),
          username: input.username,
          password: input.password,
          hashedPassword,
        },
      });
    });
  });

  describe('deleteUser', () => {
    it('should soft delete user successfully', async () => {
      const deletedUser = { ...mockUser, deletedAt: new Date() };
      prismaService.user.update.mockResolvedValue(deletedUser);

      const result = await resolver.deleteUser(mockUser);

      expect(result).toEqual(deletedUser);
      expect(prismaService.user.update).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        data: { deletedAt: expect.any(Date) },
      });
    });
  });

  describe('signinUser', () => {
    it('should sign in user successfully', async () => {
      const input = {
        username: 'testuser',
        password: 'password123',
      };

      const authResponse = { accessToken: 'mock-token' };
      authService.signIn.mockResolvedValue(authResponse);

      const result = await resolver.signinUser(input);

      expect(result).toEqual(authResponse);
      expect(authService.signIn).toHaveBeenCalledWith(input.username, input.password);
    });
  });

  describe('adminDeleteUser', () => {
    it('should allow admin to delete any user', async () => {
      const targetUserId = 'target-user-id';
      const targetUser = { ...mockUser, id: targetUserId };

      prismaService.user.findUnique.mockResolvedValue(targetUser);
      prismaService.user.update.mockResolvedValue({ ...targetUser, deletedAt: new Date() });

      const result = await resolver.adminDeleteUser(mockUser, targetUserId);

      expect(result).toBe(true);
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: targetUserId },
      });
      expect(prismaService.user.update).toHaveBeenCalledWith({
        where: { id: targetUserId },
        data: { deletedAt: expect.any(Date) },
      });
    });

    it('should throw error when user not found', async () => {
      const targetUserId = 'nonexistent-user';

      prismaService.user.findUnique.mockResolvedValue(null);

      await expect(resolver.adminDeleteUser(mockUser, targetUserId)).rejects.toThrow('User not found');
    });
  });
});