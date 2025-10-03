import { Booking } from './Booking';
export declare enum CommissionStatus {
    PENDING = "pending",
    APPROVED = "approved",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed",
    CANCELLED = "cancelled"
}
export declare enum CommissionType {
    PERFORMANCE = "performance",
    RECORDING = "recording",
    WORKSHOP = "workshop",
    CONSULTATION = "consultation",
    OTHER = "other"
}
export declare class Commission {
    id: number;
    title: string;
    description?: string;
    amount: number;
    duration?: string;
    inclusions?: string[];
    bookings?: Booking[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
//# sourceMappingURL=Commission.d.ts.map