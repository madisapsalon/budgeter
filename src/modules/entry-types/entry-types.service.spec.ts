import { Test, TestingModule } from '@nestjs/testing';
import { EntryTypesService } from './entry-types.service';
import { EntryTypesRepository } from './entry-types.repository';
import { NotFoundException } from '@nestjs/common';

const userId = '123';
const mockEntryTypesRepository = () => ({
  getUserEntryTypes: jest.fn(),
  addEntryType: jest.fn(),
  getSingleEntryType: jest.fn(),
  updateEntryType: jest.fn(),
  delete: jest.fn(),
});

describe('EntryTypesService', () => {
  let service;
  let repository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EntryTypesService,
        { provide: EntryTypesRepository, useFactory: mockEntryTypesRepository },
      ],
    }).compile();

    service = await module.get<EntryTypesService>(EntryTypesService);
    repository = await module.get<EntryTypesRepository>(EntryTypesRepository);
  });

  describe('getUserEntryTypes', () => {
    it('should be return user entry types', async () => {
      const mockEntryType = {
        id: 'qwer-1234',
        name: 'test name',
      };
      repository.getUserEntryTypes.mockResolvedValue(mockEntryType);
      expect(repository.getUserEntryTypes).not.toHaveBeenCalled();
      const result = await service.getUserEntryTypes(userId);
      expect(repository.getUserEntryTypes).toHaveBeenCalled();
      expect(result).toEqual(mockEntryType);
    });
  });

  describe('addEntryType', () => {
    it('should return new entry type', async () => {
      const newEntryType = { name: 'food', description: 'food and stuff' };
      repository.addEntryType.mockResolvedValue(newEntryType);
      expect(repository.addEntryType).not.toHaveBeenCalled();
      const result = await service.addEntryType(newEntryType, userId);
      expect(repository.addEntryType).toHaveBeenCalled();
      expect(result).toEqual(newEntryType);
    });
  });

  describe('getSingleEntryType', () => {
    it('should return single entry type', async () => {
      const singleEntryType = { id: '1', name: 'Test name', description: 'Test description' };
      repository.getSingleEntryType.mockResolvedValue(singleEntryType);
      expect(repository.getSingleEntryType).not.toHaveBeenCalled();
      const result = await service.getSingleEntryType('1', userId);
      expect(repository.getSingleEntryType).toHaveBeenCalledWith('1', userId);
      expect(result).toEqual(singleEntryType);
    });

    it('should throw NotFoundException', () => {
      repository.getSingleEntryType.mockResolvedValue(null);
      expect(service.getSingleEntryType('2', userId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateEntryType', () => {
    it('should return updated entry type', async () => {
      const existingEntryType = { id: '1', name: 'Test name', description: 'Test description' };
      const updatedEntryType = { id: '1', name: 'Test name updated', description: 'Test description updated' };
      service.getSingleEntryType = jest.fn().mockResolvedValue(existingEntryType);
      repository.updateEntryType.mockResolvedValue(updatedEntryType);

      expect(service.getSingleEntryType).not.toHaveBeenCalled();
      expect(repository.updateEntryType).not.toHaveBeenCalled();

      const result = await service.updateEntryType(existingEntryType, userId);
      expect(service.getSingleEntryType).toHaveBeenCalled();
      expect(repository.updateEntryType).toHaveBeenCalled();
      expect(result).toEqual(updatedEntryType);
    });
  });

  describe('deleteEntryType', () => {
    it('should return task deleted string', async () => {
      repository.delete.mockResolvedValue({ affected: 1 });
      expect(repository.delete).not.toHaveBeenCalled();
      const result = await service.deleteEntryType('1', userId);
      expect(repository.delete).toHaveBeenCalledWith({ id: '1', userId });
      expect(result).toEqual('Entry type successfully deleted');
    });

    it('should throw error if task id could not be found', () => {
      repository.delete.mockResolvedValue({ affected: 0 });
      expect(service.deleteEntryType('1', userId)).rejects.toThrow(NotFoundException);
    });
  });
});
