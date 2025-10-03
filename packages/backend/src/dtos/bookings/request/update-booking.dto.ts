import { IsString, IsEmail, IsOptional, IsEnum, IsInt, IsDateString, MaxLength, MinLength } from 'class-validator';
import { Duration, BookingStatus } from '../../../shared/enum/EBooking.enum';

export class UpdateBookingDto {
  @IsOptional()
  @IsString()
  @MaxLength(255, { message: 'Full name must not exceed 255 characters' })
  @MinLength(2, { message: 'Full name must be at least 2 characters' })
  fullName?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @MaxLength(255, { message: 'Email must not exceed 255 characters' })
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20, { message: 'Phone number must not exceed 20 characters' })
  @MinLength(10, { message: 'Phone number must be at least 10 characters' })
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255, { message: 'Event location must not exceed 255 characters' })
  @MinLength(5, { message: 'Event location must be at least 5 characters' })
  eventLocation?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Please provide a valid date in ISO format' })
  eventDate?: string;

  @IsOptional()
  @IsEnum(Duration, { message: 'Please select a valid duration' })
  duration?: Duration;

  @IsOptional()
  @IsString()
  @MaxLength(1000, { message: 'Additional message must not exceed 1000 characters' })
  additionalMessage?: string;

  @IsOptional()
  @IsInt({ message: 'Commission ID must be a valid number' })
  commissionId?: number;

  @IsOptional()
  @IsString()
  @MaxLength(255, { message: 'Custom event type must not exceed 255 characters' })
  customEventType?: string;

  @IsOptional()
  @IsEnum(BookingStatus, { message: 'Please select a valid booking status' })
  status?: BookingStatus;

  @IsOptional()
  @IsDateString({}, { message: 'Please provide a valid date in ISO format' })
  confirmedAt?: string;
}