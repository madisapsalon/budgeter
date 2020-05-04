import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EntriesService } from './entries.service';
import { GetUserId } from '../user/get-user.decorator';
import { EntryDto } from './dto/entry.dto';
import { EntriesBodyDto } from './dto/entries-body.dto';

@Controller('entries')
@UseGuards(AuthGuard())
export class EntriesController {

  constructor(private entriesService: EntriesService) {}

  @Get()
  getAllEntries(@Body() entries: EntriesBodyDto, @GetUserId() userId: string) {
    if (entries.startDate || entries.endDate) {
      return this.entriesService.getEntriesByDate(entries, userId);
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

  @Patch('/:id')
  async updateEntry(
    @Param('id') id: string,
    @Body('amount') amount: number,
    @GetUserId() userId: string) {
    return this.entriesService.updateEntry(id, amount, userId);
  }

  @Delete()
  deleteEntry(@Body('id') id: string, @GetUserId() userId: string) {
    return this.entriesService.deleteEntry(id, userId);
  }
}
