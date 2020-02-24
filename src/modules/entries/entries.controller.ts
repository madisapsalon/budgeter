import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EntriesService } from './entries.service';
import { GetUser } from '../user/get-user.decorator';
import { User } from '../user/user.entity';
import { EntryDto } from './dto/entry.dto';

@Controller('entries')
@UseGuards(AuthGuard())
export class EntriesController {

  constructor(
    // @InjectRepository(Entries)
    // private entriesRepository: Repository<Entries>,
    private entriesService: EntriesService,
  ) {}

  @Get()
  getUserEntries(@GetUser() user: User) {
    return this.entriesService.getUserEntries(user);
  }

  @Get('/:id')
  async getEntryById(@Param('id') id: string,  @GetUser() user: User) {
    return await this.entriesService.getEntryById(id, user);
  }

  @Post()
  addEntry(@Body() entry: EntryDto, @GetUser() user: User): Promise<any> {
    return this.entriesService.addEntry(entry, user);
  }

  @Patch('/:id')
  async updateEntry(
    @Param('id') id: string,
    @Body('amount') amount: number,
    @GetUser() user: User) {
    return this.entriesService.updateEntry(id, amount, user);
  }

  @Delete('/:id')
  async deleteEntry(@Param('id') id: string, @GetUser() user: User) {
    return this.entriesService.deleteEntry(id, user);
  }
}
