import { Test, TestingModule } from '@nestjs/testing';
import { EntriesService } from './entries.service';
import { EntriesRepository } from './entries.repository';
import { EntryTypesService } from '../entry-types/entry-types.service';
import { EntryTypesRepository } from '../entry-types/entry-types.repository';

const userId = '123';
const mockEntriesRepository = () => ({
  getAllEntries: jest.fn(),
});

const mockEntryTypesRepository = () => {
};

describe('EntriesService', () => {
  let entriesService: EntriesService;
  let entryTypesService: EntryTypesService;
  let entriesRepository: EntriesRepository;
  let entryTypesRepository: EntryTypesRepository;

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
    it.skip('should return list of user entries', () => {
      expect(entriesRepository.getAllEntries).not.toHaveBeenCalled();
      entriesService.getAllEntries(userId);
      expect(entriesRepository.getAllEntries).toHaveBeenCalled();
    });
  });
});
