import { Expose, Type } from 'class-transformer';

export class SpecialProgramResponseDto {
  @Expose()
  id!: number;

  @Expose()
  title!: string;

  @Expose()
  subtitle?: string;

  @Expose()
  description!: string;

  @Expose()
  @Type(() => Date)
  startDate!: Date;

  @Expose()
  @Type(() => Date)
  endDate!: Date;

  @Expose()
  startTime!: string;

  @Expose()
  endTime!: string;

  @Expose()
  location!: string;

  @Expose()
  address?: string;

  @Expose()
  capacity!: number;

  @Expose()
  monthlyTuition!: number;

  @Expose()
  currency!: string;

  @Expose()
  minAge!: number;

  @Expose()
    maxAge!: number;

  @Expose()
  isActive!: boolean;

  @Expose()
  isFeatured!: boolean;

  @Expose()
  tags?: string[];

  @Expose()
  galleryImages?: string[];

  @Expose()
  instructors?: Array<{
    name: string;
    title: string;
    subtitle: string;
    role: string;
    qualifications: string;
    experience: string;
    image: string;
  }>;

  @Expose()
  curriculum?: Array<{
    phase: string;
    duration: string;
    description: string;
    skills: string[];
  }>;

  @Expose()
  whatsIncluded?: string[];

  @Expose()
  schedule?: Array<{
    day: string;
    startTime: string;
    endTime: string;
    activity: string;
  }>;

  @Expose()
  directorId?: number;

  @Expose()
  @Type(() => Date)
  createdAt!: Date;

  @Expose()
  @Type(() => Date)
  updatedAt!: Date;
}