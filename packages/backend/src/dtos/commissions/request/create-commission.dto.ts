import { IsString, IsNumber, IsOptional, IsArray, Min, MaxLength, IsNotEmpty } from 'class-validator';

export class CreateCommissionDto {
  @IsString()
  @MaxLength(255, { message: 'Title must not exceed 255 characters' })
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber({}, { message: 'Amount must be a valid number' })
  @Min(0, { message: 'Amount must be greater than or equal to 0' })
  amount!: number;

  @IsOptional()
  @IsString()
  duration?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  inclusions?: string[];

  @IsOptional()
  @IsString()
  coverImage?: string;
}