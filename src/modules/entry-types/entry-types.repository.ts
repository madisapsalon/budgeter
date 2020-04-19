import { EntityRepository, Repository } from 'typeorm';
import { EntryTypes } from './entry-types.entity';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(EntryTypes)
export class EntryTypesRepository extends Repository<EntryTypes> {

  async getUserEntryTypes(userId: string) {
    return await this.find({ userId });
  }

  async addEntryType(entryType: EntryTypes) {
    try {
      await entryType.save();
      return entryType;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getSingleEntryType(id: string, userId: string) {
    return await this.findOne({ id, userId });
  }
}
