import { IUpdateUserReqDto } from '@/shared/interfaces/users/request/IUpdateUserReqDto';
import { IsEmail, IsOptional, IsString, IsBoolean, IsPhoneNumber, MinLength, MaxLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends CreateUserDto implements IUpdateUserReqDto {}