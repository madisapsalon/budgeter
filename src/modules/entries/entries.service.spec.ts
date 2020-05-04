import { Test, TestingModule } from '@nestjs/testing';
import { EntriesService } from './entries.service';
import { EntriesRepository } from './entries.repository';
import { EntryTypesService } from '../entry-types/entry-types.service';
import { EntryTypesRepository } from '../entry-types/entry-types.repository';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';

const userId = '123';
const mockEntriesRepository = () => ({
  getAllEntries: jest.fn(),
  getSingleEntry: jest.fn(),
  updateEntry: jest.fn(),
  deleteEntry: jest.fn(),
  addEntry: jest.fn(),
  getEntriesByOptions: jest.fn(),
});

const mockEntryTypesRepository = () => ({});

describe('EntriesService', () => {
  let entriesService;
  let entryTypesService;
  let entriesRepository;
  let entryTypesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EntriesService,
        EntryTypesService,
        { provide: EntriesRepository, useFactory: mockEntriesRepository },
        { provide: EntryTypesRepository, useFactory: mockEntryTypesRepository },
      ],
    }).compile();

    entriesService = await module.get<EntriesService>(EntriesService);
    entryTypesService = await module.get<EntryTypesService>(EntryTypesService);
    entriesRepository = await module.get<EntriesRepository>(EntriesRepository);
    entryTypesRepository = await module.get<EntryTypesRepository>(EntryTypesRepository);
  });

  describe('getAllEntries', () => {
    it('should return list of user entries', async () => {
      const userAllEntries = [{ id: '1',  amount: 11}];
      entriesRepository.getAllEntries.mockResolvedValue(userAllEntries);
      expect(entriesRepository.getAllEntries).not.toHaveBeenCalled();

      const result = await entriesService.getAllEntries(userId);
      expect(entriesRepository.getAllEntries).toHaveBeenCalledWith(userId);
      expect(result).toEqual(userAllEntries);
    });

    it('should throw NotFoundException if entries could not be found', () => {
      entriesRepository.getAllEntries.mockResolvedValue(null);
      expect(entriesService.getAllEntries(userId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getSingleEntry', () => {
    it('should return single entry', async () => {
      const singleEntry = { id: '1',  amount: 11};
      entriesRepository.getSingleEntry.mockResolvedValue(singleEntry);
      expect(entriesRepository.getAllEntries).not.toHaveBeenCalled();

      const id = '1';
      const result = await entriesService.getSingleEntry(id, userId);
      expect(entriesRepository.getSingleEntry).toHaveBeenCalledWith(id, userId);
      expect(result).toEqual(singleEntry);
    });

    it('should throw NotFoundException if single entry could not be found', () => {
      entriesRepository.getSingleEntry.mockResolvedValue(null);
      expect(entriesRepository.getSingleEntry).not.toHaveBeenCalled();
      expect(entriesService.getSingleEntry('12', userId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('addEntry', () => {
    it('should return added entry with entry type', async () => {
      const entry = { amount: 11, entryTypeId: '1' };
      const entryType = { id: '1', name: 'Test entry type' };
      const addedEntry = {
        amount: 11,
        userId: '123',
        entryTypes: { id: '1', name: 'Test entry type' },
      };

      entryTypesService.getSingleEntryType = jest.fn();
      entryTypesService.getSingleEntryType.mockResolvedValue(entryType);
      expect(entryTypesService.getSingleEntryType).not.toHaveBeenCalled();

      entriesRepository.addEntry.mockResolvedValue(addedEntry);
      expect(entriesRepository.addEntry).not.toHaveBeenCalled();

      const result = await entriesService.addEntry(entry, userId);
      expect(entryTypesService.getSingleEntryType).toHaveBeenCalledWith(entry.entryTypeId, userId);
      expect(entriesRepository.addEntry).toHaveBeenCalled();
      expect(result).toEqual(addedEntry);
    });

    it('should return added entry without entry type', async () => {
      const entry = { amount: 11 };
      const addedEntry = { amount: 11, userId: '123' };
      entriesRepository.addEntry.mockResolvedValue(addedEntry);
      expect(entriesRepository.addEntry).not.toHaveBeenCalled();

      const result = await entriesService.addEntry(entry, userId);
      expect(entriesRepository.addEntry).toHaveBeenCalled();
      expect(result).toEqual(addedEntry);
    });

    it('should throw InternalServerErrorException if entry could not be added', () => {
      const entry = { amount: 11 };
      const addedEntry = { amount: 11, userId: '123' };
      entriesRepository.addEntry.mockRejectedValue(addedEntry);
      expect(entriesService.addEntry(entry, userId)).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('updateEntry', () => {
    it('should return updated entry', async () => {
      const updatedEntry = { id: '1',  amount: 11 };
      entriesRepository.updateEntry.mockResolvedValue(updatedEntry);
      expect(entriesRepository.updateEntry).not.toHaveBeenCalled();
      const result = await entriesService.updateEntry('1', 11, userId);
      expect(entriesRepository.updateEntry).toHaveBeenCalledWith('1', 11, userId);
      expect(result).toEqual(updatedEntry);
    });
  });

  describe('deleteEntry', () => {
    it('should return successfully deleted entry message', async () => {
      entriesRepository.deleteEntry.mockResolvedValue({ affected: 1 });
      expect(entriesRepository.deleteEntry).not.toHaveBeenCalled();

      const result = await entriesService.deleteEntry('12', userId);
      expect(entriesRepository.deleteEntry).toHaveBeenCalledWith('12', userId);
      expect(result).toEqual('Entry is successfully deleted');
    });

    it('should return NotFoundException if an entry could not been deleted', () => {
      entriesRepository.deleteEntry.mockResolvedValue({ affected: 0 });
      expect(entriesService.deleteEntry('12', userId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getEntriesByOptions', () => {
    const entries = [
      {
        createdAt: '2020-01-01',
        amount: 20,
      },
      {
        createdAt: '2020-01-10',
        amount: 10,
      },
    ];

    it('should return entries between dates', async () => {
      const entryOptions = {
        startDate: '2020-01-01',
        endDate: '2020-01-10',
      };

      entriesRepository.getEntriesByOptions.mockResolvedValue(entries);
      expect(entriesRepository.getEntriesByOptions).not.toHaveBeenCalled();
      const result = await entriesService.getEntriesByOptions(entryOptions, userId);
      expect(entriesRepository.getEntriesByOptions).toHaveBeenCalled();
      expect(result).toEqual(entries);
    });

    it('should return entries from date', async () => {
      const entryOptions = {
        startDate: '2020-01-01',
      };

      entriesRepository.getEntriesByOptions.mockResolvedValue(entries);
      expect(entriesRepository.getEntriesByOptions).not.toHaveBeenCalled();
      const result = await entriesService.getEntriesByOptions(entryOptions, userId);
      expect(entriesRepository.getEntriesByOptions).toHaveBeenCalled();
      expect(result).toEqual(entries);
    });

    it('should return entries to date', async () => {
      const entryOptions = {
        endDate: '2020-01-01',
      };
      entriesRepository.getEntriesByOptions.mockResolvedValue(entries);
      expect(entriesRepository.getEntriesByOptions).not.toHaveBeenCalled();
      const result = await entriesService.getEntriesByOptions(entryOptions, userId);
      expect(entriesRepository.getEntriesByOptions).toHaveBeenCalled();
      expect(result).toEqual(entries);
    });

    it('should return entries with a type', async () => {
      const entryOptions = {
        entryTypeId: 'q1w2-e3r4',
      };
      entriesRepository.getEntriesByOptions.mockResolvedValue(entries);
      expect(entriesRepository.getEntriesByOptions).not.toHaveBeenCalled();
      const result = await entriesService.getEntriesByOptions(entryOptions, userId);
      expect(entriesRepository.getEntriesByOptions).toHaveBeenCalled();
      expect(result).toEqual(entries);
    });
  });
});
