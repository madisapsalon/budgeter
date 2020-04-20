import { EntityRepository, Repository } from 'typeorm';
import { Entries } from './entries.entity';
import { Logger } from '@nestjs/common';

@EntityRepository(Entries)
export class EntriesRepository extends Repository<Entries> {

  async getAllEntries(userId: string) {
    return this.find({ userId });
  }

  async addEntry(entry: Entries) {
    return await entry.save();
  }

  async getSingleEntry(id: string, userId: string) {
    return await this.findOne({ id, userId });
  }

  async updateEntry(id: string, amount: number, userId: string) {
    const entryToUpdate = await this.getSingleEntry(id, userId);
    entryToUpdate.amount = amount;
    await entryToUpdate.save();
    return entryToUpdate;
  }

  async deleteEntry(id: string, userId: string) {
    return await this.delete({ id, userId });
  }
}
