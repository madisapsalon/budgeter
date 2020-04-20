import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EntryTypesService } from './entry-types.service';
import { GetUser, GetUserId } from '../user/get-user.decorator';
import { User } from '../user/user.entity';
import { NewEntryTypeDto } from './dto/new-entry-type.dto';
import { PatchEntryTypeDto } from './dto/patch-entry-type.dto';

@Controller('entry-types')
@UseGuards(AuthGuard())
export class EntryTypesController {

  constructor(private entryTypesService: EntryTypesService) {}

  @Get()
  getUserEntryTypes(@GetUserId() id: string) {
    return this.entryTypesService.getUserEntryTypes(id);
  }

  @Get('/:id')
  getSingleEntryType(@Param('id') id: string, @GetUserId() userId: string) {
    return this.entryTypesService.getSingleEntryType(id, userId);
  }

  @Post()
  addEntryType(@Body() newEntryType: NewEntryTypeDto, @GetUserId() id: string) {
    return this.entryTypesService.addEntryType(newEntryType, id);
  }

  @Patch()
  updateEntryType(@Body() entryType: PatchEntryTypeDto, @GetUserId() id: string) {
    return this.entryTypesService.updateEntryType(entryType, id);
  }

  @Delete()
  deleteEntryType(@Body('id') id: string, @GetUserId() userId: string) {
    return this.entryTypesService.deleteEntryType(id, userId);
  }
}
