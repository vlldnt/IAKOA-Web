// Réponse API entreprise: format de sortie.
import { SocialNetworksDto } from "./social-networks.dto";
import { Company } from "@prisma/client";

export class CompanyResponseDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  siren: string;
  isValidated: boolean;
  website?: string;
  description?: string;
  socialNetworks?: SocialNetworksDto;
  ownerId: string;
  eventsList?: string[];

  constructor(company: Company) {
    this.id = company.id;
    this.createdAt = company.createdAt;
    this.updatedAt = company.updatedAt;
    this.name = company.name;
    this.siren = company.siren;
    this.isValidated = company.isValidated;
    this.website = company.website ?? undefined;
    this.description = company.description ?? undefined;
    this.socialNetworks = company.socialNetworks as SocialNetworksDto;
    this.ownerId = company.ownerId;
    this.eventsList = [];
  }
}
