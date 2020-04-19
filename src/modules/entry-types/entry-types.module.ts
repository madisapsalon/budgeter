import { Module } from '@nestjs/common';
import { EntryTypesController } from './entry-types.controller';
import { EntryTypesService } from './entry-types.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntryTypesRepository } from './entry-types.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([EntryTypesRepository]),
  ],
  controllers: [EntryTypesController],
  providers: [EntryTypesService],
  exports: [EntryTypesService],
})
export class EntryTypesModule {}
