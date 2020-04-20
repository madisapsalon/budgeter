import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntriesRepository } from './entries.repository';
import { EntriesController } from './entries.controller';
import { EntriesService } from './entries.service';
import { AuthModule } from '../auth/auth.module';
import { EntryTypesService } from '../entry-types/entry-types.service';
import { EntryTypesRepository } from '../entry-types/entry-types.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([EntriesRepository, EntryTypesRepository]),
    forwardRef(() => AuthModule),
  ],
  controllers: [EntriesController],
  providers: [EntriesService, EntryTypesService],
  exports: [EntriesService],
})
export class EntriesModule {}
