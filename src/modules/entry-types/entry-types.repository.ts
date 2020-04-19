import { EntityRepository, Repository } from 'typeorm';
import { EntryTypes } from './entry-types.entity';

@EntityRepository(EntryTypes)
export class EntryTypesRepository extends Repository<EntryTypes> {

}
