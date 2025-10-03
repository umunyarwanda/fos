import { IsString, IsNotEmpty, IsOptional, IsDateString, IsNumber, IsBoolean, IsArray, ValidateNested, Min, Max, Length } from 'class-validator';
import { Type } from 'class-transformer';
import { ICreateSpecialProgramReqDto } from '@/shared/interfaces/special-programs/request/ICreateSpecialProgramReqDto';

class InstructorDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  subtitle!: string;

  @IsString()
  @IsNotEmpty()
  role!: string;

  @IsString()
  @IsNotEmpty()
  qualifications!: string;

  @IsString()
  @IsNotEmpty()
  experience!: string;

  @IsString()
  @IsNotEmpty()
  image!: string;
}

class CurriculumDto {
  @IsString()
  @IsNotEmpty()
  phase!: string;

  @IsString()
  @IsNotEmpty()
  duration!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsArray()
  @IsString({ each: true })
  skills!: string[];
}

class ScheduleDto {
  @IsString()
  @IsNotEmpty()
  day!: string;

  @IsString()
  @IsNotEmpty()
  startTime!: string;

  @IsString()
  @IsNotEmpty()
  endTime!: string;

  @IsString()
  @IsNotEmpty()
  activity!: string;
}

export class CreateSpecialProgramDto implements ICreateSpecialProgramReqDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  @IsString()
  subtitle?: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsDateString()
  @IsNotEmpty()
  startDate!: string;

  @IsDateString()
  @IsNotEmpty()
  endDate!: string;

  @IsString()
  @IsNotEmpty()
  startTime!: string;

  @IsString()
  @IsNotEmpty()
  endTime!: string;

  @IsString()
  @IsNotEmpty()
  location!: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsNumber()
  @Min(1)
  capacity!: number;

  @IsNumber()
  @Min(0)
  monthlyTuition!: number;
  
  @IsNumber()
  @Min(1)
  @Max(100)
  minAge!: number;

  @IsNumber()
  @Min(1)
  @Max(100)
  maxAge!: number;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  galleryImages?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InstructorDto)
  instructors?: InstructorDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CurriculumDto)
  curriculum?: CurriculumDto[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  whatsIncluded?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScheduleDto)
  schedule?: ScheduleDto[];
}