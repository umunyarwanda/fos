import { ContactSubject } from '../../../entities/Contact';

export interface ICreateContactReqDto {
  fullName: string;
  email: string;
  phoneNumber?: string;
  subject: ContactSubject;
  message: string;
}