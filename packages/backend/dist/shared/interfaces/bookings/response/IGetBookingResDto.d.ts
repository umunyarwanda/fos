import { Duration, BookingStatus } from '../../../entities/Booking';
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
//# sourceMappingURL=IGetBookingResDto.d.ts.map