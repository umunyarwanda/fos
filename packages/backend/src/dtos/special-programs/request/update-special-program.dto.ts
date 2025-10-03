import { IsString, IsOptional, IsDateString, IsNumber, IsBoolean, IsArray, ValidateNested, Min, Max, Length } from 'class-validator';
import { Type } from 'class-transformer';

class InstructorDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  subtitle?: string;

  @IsString()
  @IsOptional()
  role?: string;

  @IsString()
  @IsOptional()
  qualifications?: string;

  @IsString()
  @IsOptional()
  experience?: string;

  @IsString()
  @IsOptional()
  image?: string;
}

class CurriculumDto {
  @IsString()
  @IsOptional()
  phase?: string;

  @IsString()
  @IsOptional()
  duration?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  skills?: string[];
}

class ScheduleDto {
  @IsString()
  @IsOptional()
  day?: string;

  @IsString()
  @IsOptional()
  startTime?: string;

  @IsString()
  @IsOptional()
  endTime?: string;

  @IsString()
  @IsOptional()
  activity?: string;
}

export class UpdateSpecialProgramDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  subtitle?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;

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

  @IsNumber()
  @Min(1)
  @IsOptional()
  capacity?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  monthlyTuition?: number;

  @IsString()
  @Length(3, 3)
  @IsOptional()
  currency?: string;

  @IsNumber()
  @Min(1)
  @Max(100)
  @IsOptional()
  minAge?: number;

  @IsNumber()
  @Min(1)
  @Max(100)
  @IsOptional()
  maxAge?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  galleryImages?: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InstructorDto)
  @IsOptional()
  instructors?: InstructorDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CurriculumDto)
  @IsOptional()
  curriculum?: CurriculumDto[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  whatsIncluded?: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScheduleDto)
  @IsOptional()
  schedule?: ScheduleDto[];
}