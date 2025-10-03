import { Commission } from './Commission';
import { BookingStatus, Duration } from '../shared/enum/EBooking.enum';
export declare class Booking {
    id: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    eventLocation: string;
    eventDate: Date;
    duration?: Duration;
    additionalMessage?: string;
    commission?: Commission;
    commissionId?: number;
    customEventType?: string;
    status: BookingStatus;
    confirmedAt?: Date;
    completedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
//# sourceMappingURL=Booking.d.ts.map