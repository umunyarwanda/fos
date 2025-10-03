import { IsString, IsEmail, IsOptional, IsEnum, MaxLength, MinLength } from 'class-validator';
import { ContactSubject } from '../../../entities/Contact';

export class CreateContactDto {
  @IsString()
  @MaxLength(255, { message: 'Full name must not exceed 255 characters' })
  @MinLength(2, { message: 'Full name must be at least 2 characters' })
  fullName!: string;

  @IsEmail({}, { message: 'Please provide a valid email address' })
  @MaxLength(255, { message: 'Email must not exceed 255 characters' })
  email!: string;

  @IsOptional()
  @IsString()
  @MaxLength(20, { message: 'Phone number must not exceed 20 characters' })
  phoneNumber?: string;

  @IsEnum(ContactSubject, { message: 'Please select a valid subject' })
  subject!: ContactSubject;

  @IsString()
  @MinLength(10, { message: 'Message must be at least 10 characters' })
  @MaxLength(2000, { message: 'Message must not exceed 2000 characters' })
  message!: string;
}