import { Injectable } from '@nestjs/common';
import { EntryTypesRepository } from './entry-types.repository';

@Injectable()
export class EntryTypesService {

  constructor(private repository: EntryTypesRepository) {}

  getUserEntryTypes(userId: string) {
    return this.repository.getUserEntryTypes(userId);
  }
}
