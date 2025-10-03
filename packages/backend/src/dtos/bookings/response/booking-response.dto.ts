import { Expose } from 'class-transformer';

export class BookingResponseDto {
  @Expose()
  id!: number;

  @Expose()
  fullName!: string;

  @Expose()
  email!: string;

  @Expose()
  phoneNumber!: string;

  @Expose()
  eventLocation!: string;

  @Expose()
  eventDate!: Date;

  @Expose()
  duration?: string;

  @Expose()
  additionalMessage?: string;

  @Expose()
  commissionId?: number;

  @Expose()
  customEventType?: string;

  @Expose()
  status!: string;

  @Expose()
  confirmedAt?: Date;

  @Expose()
  completedAt?: Date;

  @Expose()
  createdAt!: Date;

  @Expose()
  updatedAt!: Date;
}