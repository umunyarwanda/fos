import { Expose, Type } from 'class-transformer';

export class EventResponseDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  subtitle?: string;

  @Expose()
  description: string;

  @Expose()
  @Type(() => Date)
  eventDate: Date;

  @Expose()
  startTime: string;

  @Expose()
  endTime?: string;

  @Expose()
  location: string;

  @Expose()
  address?: string;

  @Expose()
  capacity?: number;

  @Expose()
  isActive: boolean;

  @Expose()
  isFeatured: boolean;

  @Expose()
  tags?: string[];

  @Expose()
  galleryImages?: string[];

  @Expose()
  featuredPerformers?: Array<{
    name: string;
    title: string;
    subtitle: string;
    role: string;
    image: string;
  }>;

  @Expose()
  venueType: 'indoor' | 'outdoor';

  @Expose()
  organizerId?: number;

  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @Expose()
  @Type(() => Date)
  updatedAt: Date;
}