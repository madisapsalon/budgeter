import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PatchEntryTypeDto {
  @IsNotEmpty()
  id: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;
}
