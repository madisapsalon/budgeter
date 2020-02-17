import { Body, Controller, Get, InternalServerErrorException, Param, Post, Req, UseGuards } from '@nestjs/common';
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
  ) {
  }

  @Get()
  getUserEntries(@GetUser() user: User) {
    return this.entriesService.getUserEntries(user);
  }

  @Get('/:id')
  getEntryById(@Param('id') id: string,  @GetUser() user: User) {
    return id;
  }

  @Post()
  addEntry(@Body() entry: EntryDto, @GetUser() user: User): Promise<any> {
    return this.entriesService.addEntry(entry, user);
  }
}
