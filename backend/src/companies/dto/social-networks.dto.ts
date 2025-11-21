// Réseaux sociaux: URLs optionnelles validées.
import { IsOptional, IsUrl } from 'class-validator';

export class SocialNetworksDto {
  @IsOptional()
  @IsUrl()
  facebook?: string;

  @IsOptional()
  @IsUrl()
  instagram?: string;

  @IsOptional()
  @IsUrl()
  x?: string;

  @IsOptional()
  @IsUrl()
  youtube?: string;

  @IsOptional()
  @IsUrl()
  tiktok?: string;
}