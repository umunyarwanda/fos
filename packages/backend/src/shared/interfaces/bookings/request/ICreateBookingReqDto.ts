import { Duration } from "../../../../shared/enum/EBooking.enum";

export interface ICreateBookingReqDto {
  fullName: string;
  email: string;
  phoneNumber: string;
  eventLocation: string;
  eventDate: string; // ISO date string
  duration?: Duration;
  additionalMessage?: string;
  commissionId?: number;
  customEventType?: string;
}