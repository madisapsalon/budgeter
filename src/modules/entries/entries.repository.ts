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

  async addEntry(entry: EntryDto, user: User): Promise<any> {
    const { amount } = entry;

    const newEntry = new Entries();
    newEntry.amount = amount;

    try {
      newEntry.user = user;
      await newEntry.save();
      return newEntry;
    } catch (error) {
      this.logger.error(`Cannot add new entry. ${JSON.stringify(entry)}`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async getSingleEntry(id: string, user: User) {
    const entry = await this.findOne({ where: { id, userId: user.id } });
    if (!entry) {
      this.logger.error('Could not find single entry');
      throw new NotFoundException();
    }
    return entry;
  }

  async updateEntry(id: string, amount: number, user: User) {
    const taskToUpdate = await this.getSingleEntry(id, user);
    taskToUpdate.amount = amount;
    await taskToUpdate.save();
    return taskToUpdate;
  }

  async deleteEntry(id: string, user: User) {
    const result = await this.delete({ id, userId: user.id });
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
}
