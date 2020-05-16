import { IsNotEmpty, IsOptional } from 'class-validator';

export class EntryDto {
  @IsNotEmpty()
  amount: number;

  @IsOptional()
  entryTypeId: string;
}
