import { Duration } from '../../../shared/enum/EBooking.enum';
import { ICreateBookingReqDto } from '@/shared/interfaces/bookings/request/ICreateBookingReqDto';
export declare class CreateBookingDto implements ICreateBookingReqDto {
    fullName: string;
    email: string;
    phoneNumber: string;
    eventLocation: string;
    eventDate: string;
    duration?: Duration;
    additionalMessage?: string;
    commissionId?: number;
    customEventType?: string;
}
//# sourceMappingURL=create-booking.dto.d.ts.map