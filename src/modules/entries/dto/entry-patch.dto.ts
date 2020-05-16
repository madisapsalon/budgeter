import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class EntryPatchDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsOptional()
  amount: number;

  @IsOptional()
  @IsUUID()
  entryTypeId: string;
}
