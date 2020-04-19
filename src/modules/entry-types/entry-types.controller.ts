import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EntryTypesService } from './entry-types.service';
import { GetUser } from '../user/get-user.decorator';
import { User } from '../user/user.entity';

@Controller('entry-types')
@UseGuards(AuthGuard())
export class EntryTypesController {

  constructor(private entryTypesService: EntryTypesService) {}

  @Get()
  getUserEntryTypes(@GetUser() user: User) {
    const { id } = user;
    return this.entryTypesService.getUserEntryTypes(id);
  }
}
