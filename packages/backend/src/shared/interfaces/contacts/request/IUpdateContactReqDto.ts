import { ContactSubject, ContactStatus } from '../../../entities/Contact';

export interface IUpdateContactReqDto {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  subject?: ContactSubject;
  message?: string;
  status?: ContactStatus;
  adminNotes?: string;
}