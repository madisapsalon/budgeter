import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { EntriesRepository } from './entries.repository';
import { EntryDto } from './dto/entry.dto';

@Injectable()
export class EntriesService {

  constructor(
    private entriesRepository: EntriesRepository,
  ) {}

  async getAllEntries(user: User) {
    return this.entriesRepository.getAllEntries(user);
  }

  async getSingleEntry(id: string, user: User) {
    return await this.entriesRepository.getSingleEntry(id, user);
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
