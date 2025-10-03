import { Expose, Type } from 'class-transformer';

export class ScheduleResponseDto {
  @Expose()
  id!: number;

  @Expose()
  title!: string;

  @Expose()
  description?: string;

  @Expose()
  @Type(() => Date)
  scheduleDate!: Date;

  @Expose()
  startTime!: string;

  @Expose()
  endTime!: string;

  @Expose()
  location?: string;

  @Expose()
  address?: string;

  @Expose()
  eventType!: 'rehearsal' | 'performance' | 'outreach' | 'recording' | 'meeting' | 'other';

  @Expose()
  status!: 'confirmed' | 'tentative' | 'cancelled' | 'completed';

  @Expose()
  isRecurring!: boolean;

  @Expose()
  recurrencePattern?: 'weekly' | 'monthly' | 'yearly' | 'none' = 'none';

  @Expose()
  recurrenceInterval?: number = 0;

  @Expose()
  isActive!: boolean;

  @Expose()
  @Type(() => Date)
  createdAt!: Date;

  @Expose()
  @Type(() => Date)
  updatedAt!: Date;
}