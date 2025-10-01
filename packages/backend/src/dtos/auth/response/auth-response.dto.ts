import { Expose } from 'class-transformer';

export class AuthResponseDto {
  @Expose()
  user!: {
    id: number;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    phone?: string;
  };

  @Expose()
  token!: string;

  @Expose()
  expiresIn!: number;
}