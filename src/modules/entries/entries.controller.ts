import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EntriesService } from './entries.service';
import { GetUserId } from '../user/get-user.decorator';
import { EntryDto } from './dto/entry.dto';
import { EntryOptionsDto } from './dto/entries-body.dto';
import { EntryPatchDto } from './dto/entry-patch.dto';

@Controller('entries')
@UseGuards(AuthGuard())
export class EntriesController {

  constructor(private entriesService: EntriesService) {}

  @Get()
  getAllEntries(@Body() entryOptions: EntryOptionsDto, @GetUserId() userId: string) {
    if (entryOptions) {
      return this.entriesService.getEntriesByOptions(entryOptions, userId);
    }
    return this.entriesService.getAllEntries(userId);
  }

  @Get('/:id')
  async getSingleEntry(@Param('id') id: string,  @GetUserId() userId: string) {
    return await this.entriesService.getSingleEntry(id, userId);
  }

  @Post()
  addEntry(@Body() entry: EntryDto, @GetUserId() userId: string) {
    return this.entriesService.addEntry(entry, userId);
  }

  @Patch()
  async updateEntry(@Body() entryPatch: EntryPatchDto, @GetUserId() userId: string) {
    return this.entriesService.updateEntry(entryPatch, userId);
  }

  @Delete()
  deleteEntry(@Body('id') id: string, @GetUserId() userId: string) {
    return this.entriesService.deleteEntry(id, userId);
  }
}
