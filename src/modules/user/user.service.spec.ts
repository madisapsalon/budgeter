import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { ConflictException } from '@nestjs/common';

const userId = '123';
const mockUserRepository = () => ({
  getUser: jest.fn(),
  deleteUser: jest.fn(),
  updateUser: jest.fn(),
  getUserByEmail: jest.fn(),
});

describe('UsersService', () => {
  let service;
  let repository;
  const user = {
    id: '1',
    entryTypes: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    email: 'test@test.ee',
    password: 'password',
    salt: 'passwordSalt',
    name: 'User name',
    entries: [],
  };
  const safeUserData = {
    id: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    email: 'test@test.ee',
    name: 'User name',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useFactory: mockUserRepository },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<UserRepository>(UserRepository);
  });

  describe('updateUser', () => {
    const newUserData = { newEmail: 'new Email', newName: 'new Name' };
    beforeEach(() => {
      repository.getUser.mockResolvedValue(user);
      repository.updateUser.mockResolvedValue(user);
    });

    it('should return updated user', async () => {
      service.newUserExists = jest.fn().mockResolvedValue(false);
      expect(await service.updateUser(newUserData, userId)).toEqual(safeUserData);
    });

    it('should throw ConflictException', () => {
      service.newUserExists = jest.fn().mockResolvedValue(true);
      expect(service.updateUser(newUserData, userId)).rejects.toThrow(ConflictException);
    });
  });

  describe('getUser', () => {
    it('should return user safe data object', async () => {
      repository.getUser.mockResolvedValue(user);
      expect(repository.getUser).not.toHaveBeenCalled();
      expect(await service.getUser('1')).toEqual(safeUserData);
    });
  });

  describe('deleteUser', () => {
    it('should return successfully deleted user message', async () => {
      const deletedResult = { affected: 1 };
      repository.deleteUser.mockResolvedValue(deletedResult);
      expect(await service.deleteUser(userId)).toEqual({ message: 'The user is successfully deleted' });
    });

    it('should return unsuccessfully deleted object', async () => {
      const deletedResult = { affected: 0 };
      repository.deleteUser.mockResolvedValue(deletedResult);
      const notDeleted = {
        affected: 0,
        message: 'Something went wrong on delete.',
      };
      expect(await service.deleteUser(userId)).toEqual(notDeleted);
    });
  });

  describe('newUserExists', () => {
    it('should return true if a user object exists', async () => {
      repository.getUserByEmail.mockResolvedValue(user);
      expect(await service.newUserExists('test@test.ee')).toBeTruthy();
    });

    it('should return false if a user object not exists', async () => {
      repository.getUserByEmail.mockResolvedValue(null);
      expect(await service.newUserExists('test@test.ee')).toBeFalsy();
    });
  });
});
