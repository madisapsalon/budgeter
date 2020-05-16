import { IsNotEmpty, IsOptional } from 'class-validator';

export class NewEntryTypeDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description: string;
}
