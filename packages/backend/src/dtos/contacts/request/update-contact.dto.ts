import { EContactStatus } from '../../../shared/enum/EContactStatus.enum';
import { IsString, IsEmail, IsOptional, IsEnum, MaxLength, MinLength } from 'class-validator';

export class UpdateContactDto {
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
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255, { message: 'Subject must not exceed 255 characters' })
  subject?: string;

  @IsOptional()
  @IsString()
  @MinLength(10, { message: 'Message must be at least 10 characters' })
  @MaxLength(2000, { message: 'Message must not exceed 2000 characters' })
  message?: string;

  @IsOptional()
  @IsEnum(EContactStatus, { message: 'Please select a valid status' })
  status?: EContactStatus;

  @IsOptional()
  @IsString()
  @MaxLength(1000, { message: 'Admin notes must not exceed 1000 characters' })
  adminNotes?: string;
}