import { IsEmail, IsOptional, IsString } from 'class-validator';

export class PatchUserDto {
  @IsOptional()
  @IsEmail()
  newEmail: string;

  @IsOptional()
  @IsString()
  newName: string;
}
