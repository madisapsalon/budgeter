import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthCredentialsDto {

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password is too short' })
  password: string;
}
