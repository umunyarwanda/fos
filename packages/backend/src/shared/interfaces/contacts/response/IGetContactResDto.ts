// import { ContactSubject, ContactStatus } from '../../../entities/Contact';

export interface IGetContactResDto {
  id: number;
  fullName: string;
  email: string;
  phoneNumber?: string | null;
  subject: string;
  message: string;
  status: string;
  adminNotes?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}