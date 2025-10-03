// import { EventType, Duration, BookingStatus } from '../../../entities/Booking';

import { BookingStatus, Duration } from "../../../enum/EBooking.enum";

export interface IGetBookingResDto {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  eventLocation: string;
  eventDate?: string | null;
  duration?: Duration | null;
  additionalMessage?: string | null;
  commissionId?: number | null;
  customEventType?: string | null;
  status: BookingStatus;
  confirmedAt?: string | null;
  completedAt?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}