import { Expose } from 'class-transformer';

export class ContactResponseDto {
  @Expose()
  id!: number;

  @Expose()
  fullName!: string;

  @Expose()
  email!: string;

  @Expose()
  phoneNumber?: string;

  @Expose()
  subject!: string;

  @Expose()
  message!: string;

  @Expose()
  status!: string;

  @Expose()
  adminNotes?: string;

  @Expose()
  createdAt!: Date;

  @Expose()
  updatedAt!: Date;
}