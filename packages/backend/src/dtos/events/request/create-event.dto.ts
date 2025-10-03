import { IsString, IsNotEmpty, IsOptional, IsDateString, IsEnum, IsArray, IsNumber, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ICreateEventReqDto } from '@/shared/interfaces/events/request/ICreateEventReqDto';
import { EVenueType } from '../../../shared/enum/EVenueType.enum';

class FeaturedPerformerDto {
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
  image!: string;
}

export class CreateEventDto implements ICreateEventReqDto {
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
  eventDate!: string;

  @IsString()
  @IsNotEmpty()
  startTime!: string;

  @IsOptional()
  @IsString()
  endTime?: string;

  @IsString()
  @IsNotEmpty()
  location!: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsNumber()
  capacity?: number;

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
  @Type(() => FeaturedPerformerDto)
  featuredPerformers?: FeaturedPerformerDto[];

  @IsEnum(EVenueType)
  @IsNotEmpty()
  venueType!: EVenueType;
}