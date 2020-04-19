import { Controller, Get } from '@nestjs/common';

@Controller('entry-types')
export class EntryTypesController {

  @Get()
  getUserEntryTypes() {
    return 'entry-types';
  }
}
