import { ContactSubject, ContactStatus } from '../../../entities/Contact';

export interface IGetContactResDto {
  id: number;
  fullName: string;
  email: string;
  phoneNumber?: string | null;
  subject: ContactSubject;
  message: string;
  status: ContactStatus;
  adminNotes?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}