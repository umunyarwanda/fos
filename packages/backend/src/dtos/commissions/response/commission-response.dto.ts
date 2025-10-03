import { Expose } from 'class-transformer';

export class CommissionResponseDto {
  @Expose()
  id!: number;

  @Expose()
  title!: string;

  @Expose()
  description?: string;

  @Expose()
  amount!: number;

  @Expose()
  duration?: string;

  @Expose()
  inclusions?: string[];

  @Expose()
  createdAt!: Date;

  @Expose()
  updatedAt!: Date;
}