import { IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
  @IsEmail({}, { message: 'Email invalide' })
  email: string;

  @IsString()
  password: string;
}
