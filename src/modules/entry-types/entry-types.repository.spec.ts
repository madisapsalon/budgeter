import { Test } from '@nestjs/testing';
import { EntryTypesRepository } from './entry-types.repository';
import { EntryTypes } from './entry-types.entity';
import { InternalServerErrorException } from '@nestjs/common';

const userId = '123';

describe('EntryTypesRepository', () => {
  let repository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [EntryTypesRepository],
    }).compile();
    repository = await module.get<EntryTypesRepository>(EntryTypesRepository);
  });

  describe('getUserEntryTypes', () => {
    it('return user entry types', async () => {
      repository.find = jest.fn();
      repository.find.mockReturnValue(['entry1', 'entry2']);
      expect(repository.find).not.toHaveBeenCalled();
      const result = await repository.getUserEntryTypes(userId);
      expect(repository.find).toHaveBeenCalledWith({ userId });
      expect(result).toEqual(['entry1', 'entry2']);
    });
  });

  describe('addEntryType', () => {
    const entryType = new EntryTypes();
    beforeEach(() => {
      entryType.name = 'test name';
    });
    it('should add entry type and return it', async () => {
      entryType.save = jest.fn().mockReturnValue(entryType);
      expect(entryType.save).not.toHaveBeenCalled();
      const result = await repository.addEntryType(entryType);
      expect(entryType.save).toHaveBeenCalled();
      expect(result).toEqual(entryType);
    });

    it('should throw Internal Server error if entry could not been added', () => {
      entryType.save = jest.fn().mockRejectedValue(null);
      expect(repository.addEntryType(entryType)).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('getSingleEntryType', () => {
    it('should return single entry type', async () => {
      repository.findOne = jest.fn();
      const id = 'entryId1';
      const singleEntryType = { id, name: 'Test name', description: 'Test description' };
      repository.findOne.mockReturnValue(singleEntryType);
      expect(repository.findOne).not.toHaveBeenCalled();
      const result = await repository.getSingleEntryType(id, userId);
      expect(repository.findOne).toHaveBeenCalledWith({ id, userId });
      expect(result).toEqual(singleEntryType);
    });
  });

  describe('updateEntryType', () => {
    it('should return updated entry type', async () => {
      repository.save = jest.fn();
      const entryType = new EntryTypes();
      entryType.id = '1';
      entryType.name = 'Test name';
      const updatedEntryType = { id: '1', name: 'Test name updated', description: 'Test description updated' };
      repository.save.mockReturnValue(updatedEntryType);

      expect(repository.save).not.toHaveBeenCalled();
      const result = await repository.updateEntryType(entryType);
      expect(repository.save).toHaveBeenCalledWith(entryType);
      expect(result).toEqual(updatedEntryType);
    });
  });
});
