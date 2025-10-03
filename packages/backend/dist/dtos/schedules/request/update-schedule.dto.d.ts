export declare class UpdateScheduleDto {
    title?: string;
    description?: string;
    scheduleDate?: string;
    startTime?: string;
    endTime?: string;
    location?: string;
    address?: string;
    eventType?: 'rehearsal' | 'performance' | 'outreach' | 'recording' | 'meeting' | 'other';
    status?: 'confirmed' | 'tentative' | 'cancelled' | 'completed';
    isRecurring?: boolean;
    recurrencePattern?: 'weekly' | 'monthly' | 'yearly' | 'none';
    recurrenceInterval?: number;
    isActive?: boolean;
}
//# sourceMappingURL=update-schedule.dto.d.ts.map