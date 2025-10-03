import { Expose } from 'class-transformer';

export class VideoResponseDto {
  @Expose()
  id!: number;

  @Expose()
  url!: string;

  @Expose()
  title!: string;

  @Expose()
  description?: string;

  @Expose()
  type!: string;

  @Expose()
  isActive!: boolean;

  @Expose()
  isFeatured!: boolean;

  @Expose()
  createdAt!: Date;

  @Expose()
  updatedAt!: Date;
}