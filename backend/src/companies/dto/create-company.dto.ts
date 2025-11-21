// Création entreprise: nom, description, site, réseaux sociaux.
import { IsString, MaxLength, IsBoolean, IsOptional, IsUrl, ValidateNested, Matches } from "class-validator";
import { Type } from "class-transformer";
import { SocialNetworksDto } from "./social-networks.dto";

export class CreateCompanyDto {
  @IsString()
  @MaxLength(100, { message: "Le nom de l'entreprise ne peut pas dépasser 100 caractères" })
  name: string;

  @IsString()
  @Matches(/^\d{9}$/, { message: "Le SIREN doit contenir exactement 9 chiffres" })
  siren: string;

  @IsString()
  @MaxLength(300, { message: "La description ne peut pas dépasser 300 caractères" })
  description?: string;

  @IsBoolean()
  @IsOptional()
  isValidated?: boolean;

  @IsOptional()
  @IsUrl({}, { message: "URL de site web invalide" })
  @MaxLength(500, { message: "Le site web ne peut pas dépasser 500 caractères" })
  website?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => SocialNetworksDto)
  socialNetworks?: SocialNetworksDto;
}

