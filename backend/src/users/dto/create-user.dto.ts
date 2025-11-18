import { IsEmail, IsString, MaxLength, IsOptional, IsBoolean, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(30, { message: 'Le nom ne peut pas dépasser 30 caractères' })
  name: string;

  @IsEmail({}, { message: 'Email invalide' })
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: 'Format d\'email invalide'
  })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' })
  password: string;

  @IsOptional()
  @IsBoolean()
  isCreator?: boolean;
}
