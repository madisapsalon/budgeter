import { forwardRef, Module } from '@nestjs/common';
import { EntryTypesController } from './entry-types.controller';
import { EntryTypesService } from './entry-types.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntryTypesRepository } from './entry-types.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EntryTypesRepository]),
    forwardRef(() => AuthModule),
  ],
  controllers: [EntryTypesController],
  providers: [EntryTypesService],
  exports: [EntryTypesService],
})
export class EntryTypesModule {}
