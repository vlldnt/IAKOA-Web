import { User as PrismaUser } from '@prisma/client';

export class User implements PrismaUser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  password: string;
  email: string;
  isCreator: boolean;
  companies: string[];
  favorites: string[];
}
