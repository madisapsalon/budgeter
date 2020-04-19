import { Injectable, NotFoundException } from '@nestjs/common';
import { EntryTypesRepository } from './entry-types.repository';
import { NewEntryTypeDto } from './dto/new-entry-type.dto';
import { EntryTypes } from './entry-types.entity';

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
}
