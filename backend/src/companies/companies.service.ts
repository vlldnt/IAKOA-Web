import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyResponseDto } from './dto/company-response.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CompaniesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCompanyDto: CreateCompanyDto, userId: string): Promise<CompanyResponseDto> {
    const company = await this.prisma.company.create({
      data: {
        name: createCompanyDto.name,
        siren: createCompanyDto.siren,
        description: createCompanyDto.description ?? undefined,
        website: createCompanyDto.website ?? undefined,
        socialNetworks: createCompanyDto.socialNetworks ? JSON.parse(JSON.stringify(createCompanyDto.socialNetworks)) : undefined,
        isValidated: createCompanyDto.isValidated ?? false,
        ownerId: userId,
      },
    });

    return new CompanyResponseDto(company);
  }

  findAll() {
    return `This action returns all companies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
