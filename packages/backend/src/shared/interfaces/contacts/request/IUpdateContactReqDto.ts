// import { ContactSubject, ContactStatus } from '../../../entities/Contact';

export interface IUpdateContactReqDto {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  subject?: string;
  message?: string;
  status?: string;
  adminNotes?: string;
}