import { EntityRepository, Repository } from 'typeorm';
import { Entries } from './entries.entity';
import { EntryDto } from './dto/entry.dto';
import { InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { User } from '../user/user.entity';

@EntityRepository(Entries)
export class EntriesRepository extends Repository<Entries> {
  private logger = new Logger('EntriesRepository');

  async getAllEntries(user: User): Promise<any> {
    const query = this.createQueryBuilder('entries');
    query.where('entries.userId = :userId', { userId: user.id });
    try {
      return await query.getMany();
    } catch (error) {
      this.logger.error(`Problem finding user entries ${JSON.stringify(user)}`, error.stack);
      throw new NotFoundException();
    }
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
