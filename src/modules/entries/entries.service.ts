import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { EntriesRepository } from './entries.repository';
import { EntryDto } from './dto/entry.dto';
import { Entries } from './entries.entity';
import { EntryTypesService } from '../entry-types/entry-types.service';
import { EntriesBodyDto } from './dto/entries-body.dto';
import * as moment from 'moment';

@Injectable()
export class EntriesService {
  private logger = new Logger('EntriesService');

  constructor(
    private entriesRepository: EntriesRepository,
    private entryTypesService: EntryTypesService,
  ) {}

  async getAllEntries(userId: string) {
    const entries = await this.entriesRepository.getAllEntries(userId);
    if (entries) {
      return entries;
    }
    throw new NotFoundException();
  }

  async getSingleEntry(id: string, userId: string) {
    const entry = await this.entriesRepository.getSingleEntry(id, userId);
    if (!entry) {
      this.logger.error(`Could not find entry with id ${id}`);
      throw new NotFoundException();
    }
    return entry;
  }

  async addEntry(entry: EntryDto, userId: string) {
    const { amount, entryTypeId } = entry;
    const newEntry = new Entries();

    const entryType = entryTypeId ? await this.entryTypesService.getSingleEntryType(entryTypeId, userId) : null;

    newEntry.amount = amount;
    newEntry.entryTypes = entryType;
    newEntry.userId = userId;
    try {
      return await this.entriesRepository.addEntry(newEntry);
    } catch (error) {
      this.logger.error(`Cannot add new entry. ${JSON.stringify(entry)}`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  updateEntry(id: string, amount: number, userId: string) {
    return this.entriesRepository.updateEntry(id, amount, userId);
  }

  async deleteEntry(id: string, userId: string) {
    const result = await this.entriesRepository.deleteEntry(id, userId);
    if (!result.affected) {
      throw new NotFoundException();
    }
    return 'Entry is successfully deleted';
  }

  async getEntriesByDate(entries: EntriesBodyDto, userId: string) {
    const { startDate, endDate } = entries;
    const startDateFormatted = moment(startDate).format();
    const endDateFormatted = endDate ? moment(`${endDate} 23:59:59.999`).format() : null;

    if (startDate) {
      return await this.entriesRepository.getEntriesFromDate(startDateFormatted, userId);
    }
    if (endDate) {
      return await this.entriesRepository.getEntriesToDate(endDateFormatted, userId);
    }
  }
}
