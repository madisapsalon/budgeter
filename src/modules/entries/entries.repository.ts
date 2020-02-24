import { EntityRepository, Repository } from 'typeorm';
import { Entries } from './entries.entity';
import { EntryDto } from './dto/entry.dto';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { User } from '../user/user.entity';

@EntityRepository(Entries)
export class EntriesRepository extends Repository<Entries> {

  async getUserEntries(user: User): Promise<any> {
    const query = this.createQueryBuilder('entries');
    query.where('entries.userId = :userId', { userId: user.id });
    const entries = await query.getMany();
    return entries;
  }

  async addEntry(entry: EntryDto, user: User): Promise<any> {
    const { amount } = entry;

    const newEntry = new Entries();
    newEntry.entry = amount;

    try {
      newEntry.user = user;
      await newEntry.save();
      return newEntry;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async getEntryById(id: string, user: User) {
    const task = await this.findOne({ where: { id, userId: user.id } });
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  async updateEntry(id: string, amount: number, user: User) {
    const taskToUpdate = await this.getEntryById(id, user);
    taskToUpdate.entry = amount;
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
