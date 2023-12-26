import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let usersService: UsersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createSpy = jest
        .spyOn(prismaService.user, 'create')
        .mockImplementationOnce(jest.fn());

      const userData: CreateUserDto = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValueOnce(null);

      let mockHash: string;

      jest.spyOn(bcrypt, 'hashSync').mockImplementation((): string => {
        mockHash = 'hashedPassword';
        return mockHash;
      });

      await usersService.create(userData);

      expect(createSpy).toHaveBeenCalledWith({
        data: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          password: mockHash,
        },
      });
    });

    it('should throw conflict exception if email is already registered', async () => {
      const userData: CreateUserDto = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      };

      jest
        .spyOn(prismaService.user, 'create')
        .mockRejectedValue(new Error('Email já registrado!'));

      await expect(usersService.create(userData)).rejects.toThrowError(
        new HttpException('Email já registrado!', HttpStatus.CONFLICT),
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const findManySpy = jest
        .spyOn(prismaService.user, 'findMany')
        .mockResolvedValueOnce([]);

      const result = await usersService.findAll();

      expect(findManySpy).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      const findUniqueSpy = jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValueOnce({
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com',
          password: 'hashedPassword',
        });

      const result = await usersService.findByEmail('john.doe@example.com');

      expect(findUniqueSpy).toHaveBeenCalledWith({
        where: { email: 'john.doe@example.com' },
      });
      expect(result).toEqual({
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'hashedPassword',
      });
    });

    it('should throw BadRequestException if user is not found by email', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValueOnce(null);

      await expect(
        usersService.findByEmail('nonexistent@example.com'),
      ).rejects.toThrowError(new BadRequestException('user not exist!'));
    });
  });

  describe('validateUserId', () => {
    it('should return a user by id', async () => {
      const findUniqueSpy = jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValueOnce({
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com',
          password: 'hashedPassword',
        });

      const result = await usersService.validateUserId(1);

      expect(findUniqueSpy).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual({
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'hashedPassword',
      });
    });

    it('should return null if user is not found by id', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValueOnce(null);

      const result = await usersService.validateUserId(99);

      expect(result).toBeNull();
    });
  });
});
