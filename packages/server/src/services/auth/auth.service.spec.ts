import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: any;
  let jwtService: any;

  const mockUser = {
    id: 'user1',
    username: 'testuser',
    password: 'plainPassword',
    hashedPassword: 'hashedPassword',
    deletedAt: null,
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaService = module.get(PrismaService);
    jwtService = module.get(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signIn', () => {
    it('should return access token for valid credentials', async () => {
      const username = 'testuser';
      const password = 'plainPassword';
      const mockToken = 'mock-jwt-token';

      prismaService.user.findUnique.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      jwtService.signAsync.mockResolvedValue(mockToken);

      const result = await service.signIn(username, password);

      expect(result).toEqual({ accessToken: mockToken });
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { username },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith(password, mockUser.hashedPassword);
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        sub: mockUser.id,
        username: mockUser.username,
      });
    });

    it('should throw UnauthorizedException for deleted user', async () => {
      const username = 'testuser';
      const password = 'plainPassword';
      const deletedUser = { ...mockUser, deletedAt: new Date() };

      prismaService.user.findUnique.mockResolvedValue(deletedUser);

      await expect(service.signIn(username, password)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException for invalid password', async () => {
      const username = 'testuser';
      const password = 'wrongPassword';

      prismaService.user.findUnique.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.signIn(username, password)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException for non-existent user', async () => {
      const username = 'nonexistent';
      const password = 'password';

      prismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.signIn(username, password)).rejects.toThrow();
    });
  });
});