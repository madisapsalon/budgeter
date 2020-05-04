import { Test } from '@nestjs/testing';
import { EntriesRepository } from './entries.repository';
import { Entries } from './entries.entity';

const userId = '123';

describe('EntriesRepository', () => {
  let repository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [EntriesRepository],
    }).compile();
    repository = await module.get<EntriesRepository>(EntriesRepository);
  });

  describe('getAllEntries', () => {
    it('should return user all entries', async () => {
      repository.find = jest.fn();
      const entries = [{ id: '1' }, { id: '2' }];
      repository.find.mockResolvedValue(entries);
      const result = await repository.getAllEntries(userId);
      expect(repository.find).toHaveBeenCalledWith({ userId });
      expect(result).toEqual(entries);
    });
  });

  describe('addEntry', () => {
    it('should return added entry', async () => {
      const entry = new Entries();
      const addedEntry = { id: '1' };
      entry.save = jest.fn().mockReturnValue(addedEntry);
      expect(entry.save).not.toHaveBeenCalled();
      const result = await repository.addEntry(entry);
      expect(entry.save).toHaveBeenCalled();
      expect(result).toEqual(addedEntry);
    });
  });

  describe('getSingleEntry', () => {
    it('should return single entry', async () => {
      repository.findOne = jest.fn();
      const entry = { id: '1' };
      repository.findOne.mockResolvedValue(entry);
      const result = await repository.getSingleEntry('1', userId);
      expect(repository.findOne).toHaveBeenCalledWith({ id: '1', userId });
      expect(result).toEqual(entry);
    });
  });

  describe('updateEntry', () => {
    it('should return updated entry', async () => {
      const updatedEntry = { id: '1', amount: 200 };
      const entryToUpdate = new Entries();
      entryToUpdate.id = '1';
      entryToUpdate.amount = 100;
      entryToUpdate.save = jest.fn().mockResolvedValue(updatedEntry);

      repository.getSingleEntry = jest.fn().mockResolvedValue(entryToUpdate);
      expect(entryToUpdate.save).not.toHaveBeenCalled();
      const result = await repository.updateEntry('1', 200, userId);
      expect(repository.getSingleEntry).toHaveBeenCalledWith('1', userId);
      expect(entryToUpdate.save).toHaveBeenCalled();
      expect(result).toEqual(entryToUpdate);
    });
  });

  describe('deleteEntry', () => {
    it('should return delete result', async () => {
      repository.delete = jest.fn();
      const deletedResult = { affected: 1 };
      repository.delete.mockResolvedValue(deletedResult);
      const result = await repository.deleteEntry('1', userId);
      expect(repository.delete).toHaveBeenCalledWith({ id: '1', userId });
      expect(result).toEqual(deletedResult);
    });
  });

  describe('getEntriesByOptions', () => {
    it('should return entries list', async () => {
      const entryOptions = {
        startDate: '2020-01-01',
      };
      repository.find = jest.fn();
      const entries = [{ id: '1' }, { id: '2' }];
      repository.find.mockResolvedValue(entries);
      const result = await repository.getEntriesByOptions(entryOptions);
      expect(repository.find).toHaveBeenCalledWith({ where: entryOptions });
      expect(result).toEqual(entries);
    });
  });
});
