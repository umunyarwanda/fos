export declare enum ContactSubject {
    GENERAL_INQUIRY = "general_inquiry",
    EVENT_BOOKING = "event_booking",
    COMMISSION_REQUEST = "commission_request",
    SUPPORT = "support",
    FEEDBACK = "feedback",
    OTHER = "other"
}
export declare enum ContactStatus {
    NEW = "new",
    IN_PROGRESS = "in_progress",
    RESPONDED = "responded",
    CLOSED = "closed"
}
export declare class Contact {
    id: number;
    fullName: string;
    email: string;
    phoneNumber?: string;
    subject: string;
    message: string;
    status: ContactStatus;
    adminNotes?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
//# sourceMappingURL=Contact.d.ts.map