import { Injectable, NotFoundException } from '@nestjs/common';
import { EntryTypesRepository } from './entry-types.repository';
import { NewEntryTypeDto } from './dto/new-entry-type.dto';
import { EntryTypes } from './entry-types.entity';
import { PatchEntryTypeDto } from './dto/patch-entry-type.dto';

@Injectable()
export class EntryTypesService {

  constructor(private repository: EntryTypesRepository) {}

  getUserEntryTypes(userId: string) {
    return this.repository.getUserEntryTypes(userId);
  }

  addEntryType(newEntryType: NewEntryTypeDto, userId: string) {
    const { name, description } = newEntryType;

    const entryType = new EntryTypes();
    entryType.name = name;
    entryType.description = description;
    entryType.userId = userId;

    return this.repository.addEntryType(entryType);
  }

  async getSingleEntryType(entryTypeId: string, userId: string) {
    const entryType = await this.repository.getSingleEntryType(entryTypeId, userId);
    if (!entryType) {
      throw new NotFoundException(`Could not found entry type with id ${entryTypeId}`);
    }
    return entryType;
  }

  async updateEntryType(entryType: PatchEntryTypeDto, userId: string) {
    const { id, name, description } = entryType;
    const existingEntryType = await this.getSingleEntryType(id, userId);

    existingEntryType.name = name ? name : existingEntryType.name;
    existingEntryType.description = description ? description : existingEntryType.description;

    return this.repository.updateEntryType(existingEntryType);
  }

  async deleteEntryType(id: string, userId: string) {
    const deletedEntryType = await this.repository.delete({ id, userId });
    if (!deletedEntryType.affected) {
      throw new NotFoundException(`Could not find entry type with id ${id}`);
    }
    return 'Entry type successfully deleted';
  }
}
