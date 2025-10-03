import { IsString, IsNotEmpty, IsOptional, IsDateString, IsEnum, IsBoolean, IsNumber, Min, Max } from 'class-validator';
import { ICreateScheduleReqDto } from '@/shared/interfaces/schedules/request/ICreateScheduleReqDto';
import { EEventType } from '../../../shared/enum/EEventType.enum';
import { EScheduleStatus } from '../../../shared/enum/EScheduleStatus.enum';
import { ERecurrencePattern } from '../../../shared/enum/ERecurrencePattern.enum';

export class CreateScheduleDto implements ICreateScheduleReqDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDateString()
  @IsNotEmpty()
  scheduleDate!: string;

  @IsString()
  @IsNotEmpty()
  startTime!: string;

  @IsString()
  @IsNotEmpty()
  endTime!: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsEnum(EEventType)
  @IsNotEmpty()
  eventType!: EEventType;

  @IsOptional()
  @IsEnum(EScheduleStatus)
  status?: EScheduleStatus;

  @IsOptional()
  @IsBoolean()
  isRecurring?: boolean;

  @IsOptional()
  @IsEnum(ERecurrencePattern)
  recurrencePattern?: ERecurrencePattern;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(52)
  recurrenceInterval?: number;
}