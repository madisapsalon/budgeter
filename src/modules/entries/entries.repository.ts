import { EntityRepository, Repository } from 'typeorm';
import { Entries } from './entries.entity';

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

  async updateEntry(entryToUpdate: Entries) {
    return await entryToUpdate.save();
  }

  async deleteEntry(id: string, userId: string) {
    return await this.delete({ id, userId });
  }

  async getEntriesByOptions(options) {
    return await this.find({ where: options });
  }
}
