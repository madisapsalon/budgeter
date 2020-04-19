import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EntryTypesService } from './entry-types.service';
import { GetUser } from '../user/get-user.decorator';
import { User } from '../user/user.entity';
import { NewEntryTypeDto } from './dto/new-entry-type.dto';

@Controller('entry-types')
@UseGuards(AuthGuard())
export class EntryTypesController {

  constructor(private entryTypesService: EntryTypesService) {}

  @Get()
  getUserEntryTypes(@GetUser() user: User) {
    const { id } = user;
    return this.entryTypesService.getUserEntryTypes(id);
  }

  @Get('/:id')
  getSingleEntryType(@Param('id') id: string, @GetUser() user: User) {
    return this.entryTypesService.getSingleEntryType(id, user.id);
  }

  @Post()
  addEntryType(@Body() newEntryType: NewEntryTypeDto, @GetUser() user: User) {
    const { id } = user;
    return this.entryTypesService.addEntryType(newEntryType, id);
  }
}
