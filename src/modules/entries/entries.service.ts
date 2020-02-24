import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { EntriesRepository } from './entries.repository';
import { Entries } from './entries.entity';
import { EntryDto } from './dto/entry.dto';

@Injectable()
export class EntriesService {

  constructor(
    private entriesRepository: EntriesRepository,
  ) {}

  async getUserEntries(user: User) {
    return this.entriesRepository.getUserEntries(user);
  }

  async getEntryById(id: string, user: User) {
    return this.entriesRepository.getEntryById(id, user);
  }

  async addEntry(entry: EntryDto, user: User) {
    return this.entriesRepository.addEntry(entry, user);
  }

  updateEntry(id: string, amount: number, user: User) {
    return this.entriesRepository.updateEntry(id, amount, user);
  }

  deleteEntry(id: string, user: User) {
    return this.entriesRepository.deleteEntry(id, user);
  }
}
