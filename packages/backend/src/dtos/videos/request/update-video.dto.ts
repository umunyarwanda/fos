import { EVideoType } from '../../../shared/enum/EVideoType.enum';
import { IsString, IsOptional, IsEnum, IsBoolean, IsUrl, MaxLength, MinLength } from 'class-validator';

export class UpdateVideoDto {
  @IsOptional()
  @IsUrl({}, { message: 'Please provide a valid URL' })
  @MaxLength(500, { message: 'URL must not exceed 500 characters' })
  url?: string;

  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Title must be at least 2 characters' })
  @MaxLength(255, { message: 'Title must not exceed 255 characters' })
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000, { message: 'Description must not exceed 1000 characters' })
  description?: string;

  @IsOptional()
  @IsEnum(EVideoType, { message: 'Please select a valid video type' })
  type?: EVideoType;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;
}