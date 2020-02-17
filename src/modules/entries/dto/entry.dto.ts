import { IsNotEmpty } from 'class-validator';

export class EntryDto {
  @IsNotEmpty()
  amount: number;
}
