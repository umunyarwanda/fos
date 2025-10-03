import { Duration, BookingStatus } from '../../../shared/enum/EBooking.enum';
export declare class UpdateBookingDto {
    fullName?: string;
    email?: string;
    phoneNumber?: string;
    eventLocation?: string;
    eventDate?: string;
    duration?: Duration;
    additionalMessage?: string;
    commissionId?: number;
    customEventType?: string;
    status?: BookingStatus;
    confirmedAt?: string;
}
//# sourceMappingURL=update-booking.dto.d.ts.map