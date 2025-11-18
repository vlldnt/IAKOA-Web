export class UserResponseDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
  isCreator: boolean;
  companies: string[];
  favorites: string[];
}
