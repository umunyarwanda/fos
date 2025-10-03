import { IsString, IsOptional, IsDateString, IsEnum, IsBoolean, IsNumber, Min, Max } from 'class-validator';

export class UpdateScheduleDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsOptional()
  scheduleDate?: string;

  @IsString()
  @IsOptional()
  startTime?: string;

  @IsString()
  @IsOptional()
  endTime?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsEnum(['rehearsal', 'performance', 'outreach', 'recording', 'meeting', 'other'])
  @IsOptional()
  eventType?: 'rehearsal' | 'performance' | 'outreach' | 'recording' | 'meeting' | 'other';

  @IsEnum(['confirmed', 'tentative', 'cancelled', 'completed'])
  @IsOptional()
  status?: 'confirmed' | 'tentative' | 'cancelled' | 'completed';

  @IsBoolean()
  @IsOptional()
  isRecurring?: boolean;

  @IsEnum(['weekly', 'monthly', 'yearly', 'none'])
  @IsOptional()
  recurrencePattern?: 'weekly' | 'monthly' | 'yearly' | 'none';

  @IsNumber()
  @Min(1)
  @Max(52)
  @IsOptional()
  recurrenceInterval?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}