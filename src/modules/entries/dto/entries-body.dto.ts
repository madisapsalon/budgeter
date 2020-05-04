import { IsISO8601, IsOptional, IsUUID } from 'class-validator';

export class EntriesBodyDto {
  @IsOptional()
  amount: number;

  @IsOptional()
  @IsISO8601()
  startDate: string;

  @IsOptional()
  @IsISO8601()
  endDate: string;

  @IsOptional()
  @IsUUID()
  entryTypeId: string;
}
